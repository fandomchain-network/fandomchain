# Spécification Technique - Bonding Curve Pump.fun (Go)

## 1. Vue d'ensemble

### 1.1 Objectif
Implémenter un système de market maker automatisé (AMM) basé sur une bonding curve qui permet l'achat et la vente de tokens sans carnet d'ordres, avec migration automatique vers un DEX une fois la liquidité atteinte.

### 1.2 Principe de fonctionnement
- **Pas d'order book** : Les prix sont calculés algorithmiquement
- **Liquidité automatique** : Le smart contract agit comme contrepartie
- **Courbe de prix** : Le prix évolue selon une formule mathématique basée sur les réserves
- **Migration automatique** : Passage vers Raydium/Uniswap à 100% de complétion

---

## 2. Architecture du système

### 2.1 Composants principaux

```
┌─────────────────────────────────────────┐
│     Smart Contract Bonding Curve        │
├─────────────────────────────────────────┤
│ - Réserves virtuelles (tokens + SOL)    │
│ - Réserves réelles (tokens + SOL)       │
│ - Fonction de calcul de prix            │
│ - Fonction buy()                         │
│ - Fonction sell()                        │
│ - Fonction migrate()                     │
└─────────────────────────────────────────┘
```

### 2.2 Structure de données

```go
package bondingcurve

import (
    "math/big"
    "time"
)

// BondingCurve représente l'état de la courbe de liaison
type BondingCurve struct {
    // Réserves virtuelles (pour le calcul de prix)
    VirtualTokenReserves *big.Int // En unités de base (10^6)
    VirtualSolReserves   *big.Int // En lamports (10^9)
    
    // Réserves réelles (montants effectifs)
    RealTokenReserves *big.Int // Tokens dans le pool
    RealSolReserves   *big.Int // SOL dans le pool
    
    // Métadonnées
    TokenTotalSupply *big.Int // Supply total du token
    TokenMint        string   // Adresse du token
    Complete         bool     // Migration effectuée ?
    
    // Constantes
    InitialVirtualTokenReserves *big.Int
    InitialVirtualSolReserves   *big.Int
    InitialRealTokenReserves    *big.Int
}

// Config contient les paramètres de configuration
type Config struct {
    InitialVirtualTokenReserves *big.Int
    InitialVirtualSolReserves   *big.Int
    InitialRealTokenReserves    *big.Int
    TokenTotalSupply            *big.Int
    TokenDecimals               int
    SolDecimals                 int
    MigrationTarget             *big.Int
    PlatformFee                 float64
    MinSolPurchase              float64
    MaxSlippageTolerance        float64
}

// TradeResult représente le résultat d'un trade
type TradeResult struct {
    AmountOut     *big.Int
    FeeAmount     *big.Int
    NewPrice      float64
    PriceImpact   float64
    Success       bool
    ErrorMessage  string
}

// Event représente un événement blockchain
type Event struct {
    Type      EventType
    User      string
    Amount1   *big.Int
    Amount2   *big.Int
    Price     float64
    Timestamp time.Time
}

type EventType int

const (
    EventTokenPurchased EventType = iota
    EventTokenSold
    EventBondingCurveCompleted
    EventMigratedToDex
)
```

---

## 3. Formule mathématique

### 3.1 Formule de prix

**Prix instantané (en SOL par token) :**

```go
// GetPrice calcule le prix instantané d'un token en SOL
func (bc *BondingCurve) GetPrice() float64 {
    const (
        lamportsPerSol = 1_000_000_000
        tokenDecimals  = 1_000_000
    )
    
    // price = (virtualSolReserves / 10^9) / (virtualTokenReserves / 10^6)
    solReservesFloat := new(big.Float).SetInt(bc.VirtualSolReserves)
    tokenReservesFloat := new(big.Float).SetInt(bc.VirtualTokenReserves)
    
    solReservesFloat.Quo(solReservesFloat, big.NewFloat(lamportsPerSol))
    tokenReservesFloat.Quo(tokenReservesFloat, big.NewFloat(tokenDecimals))
    
    price := new(big.Float).Quo(solReservesFloat, tokenReservesFloat)
    result, _ := price.Float64()
    
    return result
}
```

### 3.2 Modèle constant product

```go
// CalculateK calcule la constante k = x * y
func (bc *BondingCurve) CalculateK() *big.Int {
    k := new(big.Int).Mul(bc.VirtualTokenReserves, bc.VirtualSolReserves)
    return k
}
```

---

## 4. Fonctions principales

### 4.1 Initialisation

```go
package bondingcurve

import (
    "errors"
    "math/big"
)

// NewBondingCurve crée une nouvelle bonding curve
func NewBondingCurve(tokenMint string, initialSupply *big.Int) *BondingCurve {
    return &BondingCurve{
        // Valeurs initiales
        VirtualTokenReserves: big.NewInt(1_073_000_000_000_000),
        VirtualSolReserves:   big.NewInt(30_000_000_000),
        
        RealTokenReserves: big.NewInt(793_100_000_000_000),
        RealSolReserves:   big.NewInt(0),
        
        TokenTotalSupply: new(big.Int).Set(initialSupply),
        TokenMint:        tokenMint,
        Complete:         false,
        
        InitialVirtualTokenReserves: big.NewInt(1_073_000_000_000_000),
        InitialVirtualSolReserves:   big.NewInt(30_000_000_000),
        InitialRealTokenReserves:    big.NewInt(793_100_000_000_000),
    }
}

// DefaultConfig retourne la configuration par défaut
func DefaultConfig() *Config {
    return &Config{
        InitialVirtualTokenReserves: big.NewInt(1_073_000_000_000_000),
        InitialVirtualSolReserves:   big.NewInt(30_000_000_000),
        InitialRealTokenReserves:    big.NewInt(793_100_000_000_000),
        TokenTotalSupply:            big.NewInt(1_000_000_000_000_000),
        TokenDecimals:               6,
        SolDecimals:                 9,
        MigrationTarget:             big.NewInt(800_000_000_000_000),
        PlatformFee:                 0.01,
        MinSolPurchase:              0.0001,
        MaxSlippageTolerance:        0.05,
    }
}
```

### 4.2 Fonction d'achat (buy)

```go
// Buy exécute un achat de tokens
func (bc *BondingCurve) Buy(solAmount *big.Int, minTokensOut *big.Int) (*TradeResult, error) {
    // 1. Validation
    if err := bc.validateTrade(solAmount, true); err != nil {
        return &TradeResult{Success: false, ErrorMessage: err.Error()}, err
    }
    
    // 2. Calculer le nombre de tokens à recevoir
    tokensOut := bc.calculateTokensOut(solAmount)
    
    // 3. Vérifier le slippage
    if tokensOut.Cmp(minTokensOut) < 0 {
        return &TradeResult{
            Success:      false,
            ErrorMessage: "slippage trop élevé",
        }, errors.New("slippage trop élevé")
    }
    
    // 4. Calculer le prix initial pour impact
    initialPrice := bc.GetPrice()
    
    // 5. Mettre à jour les réserves virtuelles
    bc.VirtualSolReserves.Add(bc.VirtualSolReserves, solAmount)
    bc.VirtualTokenReserves.Sub(bc.VirtualTokenReserves, tokensOut)
    
    // 6. Mettre à jour les réserves réelles
    bc.RealSolReserves.Add(bc.RealSolReserves, solAmount)
    bc.RealTokenReserves.Sub(bc.RealTokenReserves, tokensOut)
    
    // 7. Calculer le nouveau prix et l'impact
    newPrice := bc.GetPrice()
    priceImpact := (newPrice - initialPrice) / initialPrice
    
    // 8. Vérifier si migration nécessaire
    if bc.shouldMigrate() {
        bc.migrate()
    }
    
    return &TradeResult{
        AmountOut:   tokensOut,
        NewPrice:    newPrice,
        PriceImpact: priceImpact,
        Success:     true,
    }, nil
}

// calculateTokensOut calcule le nombre de tokens reçus pour un montant SOL
func (bc *BondingCurve) calculateTokensOut(solIn *big.Int) *big.Int {
    // Formula: tokensOut = tokenReserves - (k / (solReserves + solIn))
    
    k := bc.CalculateK()
    
    newSolReserves := new(big.Int).Add(bc.VirtualSolReserves, solIn)
    newTokenReserves := new(big.Int).Div(k, newSolReserves)
    
    tokensOut := new(big.Int).Sub(bc.VirtualTokenReserves, newTokenReserves)
    
    return tokensOut
}
```

### 4.3 Fonction de vente (sell)

```go
// Sell exécute une vente de tokens
func (bc *BondingCurve) Sell(tokenAmount *big.Int, minSolOut *big.Int) (*TradeResult, error) {
    // 1. Validation
    if err := bc.validateTrade(tokenAmount, false); err != nil {
        return &TradeResult{Success: false, ErrorMessage: err.Error()}, err
    }
    
    // 2. Calculer le nombre de SOL à recevoir
    solOut := bc.calculateSolOut(tokenAmount)
    
    // 3. Vérifier le slippage
    if solOut.Cmp(minSolOut) < 0 {
        return &TradeResult{
            Success:      false,
            ErrorMessage: "slippage trop élevé",
        }, errors.New("slippage trop élevé")
    }
    
    // 4. Calculer le prix initial pour impact
    initialPrice := bc.GetPrice()
    
    // 5. Mettre à jour les réserves virtuelles
    bc.VirtualTokenReserves.Add(bc.VirtualTokenReserves, tokenAmount)
    bc.VirtualSolReserves.Sub(bc.VirtualSolReserves, solOut)
    
    // 6. Mettre à jour les réserves réelles
    bc.RealTokenReserves.Add(bc.RealTokenReserves, tokenAmount)
    bc.RealSolReserves.Sub(bc.RealSolReserves, solOut)
    
    // 7. Calculer le nouveau prix et l'impact
    newPrice := bc.GetPrice()
    priceImpact := (initialPrice - newPrice) / initialPrice
    
    return &TradeResult{
        AmountOut:   solOut,
        NewPrice:    newPrice,
        PriceImpact: priceImpact,
        Success:     true,
    }, nil
}

// calculateSolOut calcule le nombre de SOL reçus pour un montant de tokens
func (bc *BondingCurve) calculateSolOut(tokenIn *big.Int) *big.Int {
    // Formula: solOut = solReserves - (k / (tokenReserves + tokenIn))
    
    k := bc.CalculateK()
    
    newTokenReserves := new(big.Int).Add(bc.VirtualTokenReserves, tokenIn)
    newSolReserves := new(big.Int).Div(k, newTokenReserves)
    
    solOut := new(big.Int).Sub(bc.VirtualSolReserves, newSolReserves)
    
    return solOut
}
```

### 4.4 Progression de la bonding curve

```go
// GetBondingProgress retourne la progression en pourcentage
func (bc *BondingCurve) GetBondingProgress() float64 {
    if bc.RealTokenReserves.Cmp(bc.InitialRealTokenReserves) >= 0 {
        return 0.0 // Pas encore commencé
    }
    
    // progress = 1 - (realTokenReserves / initialRealTokenReserves)
    realFloat := new(big.Float).SetInt(bc.RealTokenReserves)
    initialFloat := new(big.Float).SetInt(bc.InitialRealTokenReserves)
    
    ratio := new(big.Float).Quo(realFloat, initialFloat)
    progress := new(big.Float).Sub(big.NewFloat(1.0), ratio)
    
    result, _ := progress.Float64()
    return result * 100.0 // Retourne un pourcentage
}
```

### 4.5 Migration vers DEX

```go
// shouldMigrate vérifie si la migration doit être effectuée
func (bc *BondingCurve) shouldMigrate() bool {
    // Migration quand tous les tokens sont vendus
    return bc.RealTokenReserves.Cmp(big.NewInt(0)) <= 0 || 
           bc.GetBondingProgress() >= 100.0
}

// migrate effectue la migration vers un DEX
func (bc *BondingCurve) migrate() error {
    if bc.Complete {
        return errors.New("déjà migré")
    }
    
    // 1. Calculer la liquidité à transférer
    tokensForDex := new(big.Int).Sub(bc.TokenTotalSupply, bc.InitialRealTokenReserves)
    solForDex := new(big.Int).Set(bc.RealSolReserves)
    
    // 2. Créer une pool sur le DEX (à implémenter selon la blockchain)
    // createDexPool(bc.TokenMint, tokensForDex, solForDex)
    
    // 3. Marquer comme complété
    bc.Complete = true
    
    return nil
}
```

---

## 5. Gestion des frais

```go
// FeeConfig représente la configuration des frais
type FeeConfig struct {
    BuyFee  float64 // 1% sur les achats
    SellFee float64 // 1% sur les ventes
}

// DefaultFeeConfig retourne la configuration des frais par défaut
func DefaultFeeConfig() *FeeConfig {
    return &FeeConfig{
        BuyFee:  0.01,
        SellFee: 0.01,
    }
}

// ApplyFees applique les frais sur un montant
func ApplyFees(amount *big.Int, isBuy bool, config *FeeConfig) (amountAfterFees, feeAmount *big.Int) {
    feeRate := config.SellFee
    if isBuy {
        feeRate = config.BuyFee
    }
    
    // Calculer les frais
    amountFloat := new(big.Float).SetInt(amount)
    feeFloat := new(big.Float).Mul(amountFloat, big.NewFloat(feeRate))
    
    feeAmount, _ = feeFloat.Int(nil)
    amountAfterFees = new(big.Int).Sub(amount, feeAmount)
    
    return amountAfterFees, feeAmount
}
```

---

## 6. Sécurité et validations

```go
// validateTrade vérifie la validité d'un trade
func (bc *BondingCurve) validateTrade(amount *big.Int, isBuy bool) error {
    // 1. Vérifier que la courbe n'est pas complète
    if bc.Complete {
        return errors.New("bonding curve complétée, utilisez le DEX")
    }
    
    // 2. Vérifier les montants positifs
    if amount.Cmp(big.NewInt(0)) <= 0 {
        return errors.New("montant invalide")
    }
    
    // 3. Vérifier la liquidité disponible
    if isBuy {
        if bc.RealTokenReserves.Cmp(big.NewInt(0)) <= 0 {
            return errors.New("plus de tokens disponibles")
        }
    } else {
        if bc.RealSolReserves.Cmp(big.NewInt(0)) <= 0 {
            return errors.New("pas assez de liquidité SOL")
        }
    }
    
    // 4. Vérifier les réserves virtuelles
    if bc.VirtualTokenReserves.Cmp(big.NewInt(0)) <= 0 || 
       bc.VirtualSolReserves.Cmp(big.NewInt(0)) <= 0 {
        return errors.New("réserves virtuelles invalides")
    }
    
    return nil
}

// ValidateSlippage vérifie que le slippage est acceptable
func ValidateSlippage(expected, actual *big.Int, maxSlippage float64) error {
    if expected.Cmp(big.NewInt(0)) == 0 {
        return errors.New("montant attendu invalide")
    }
    
    diff := new(big.Int).Sub(expected, actual)
    if diff.Cmp(big.NewInt(0)) < 0 {
        diff.Neg(diff)
    }
    
    diffFloat := new(big.Float).SetInt(diff)
    expectedFloat := new(big.Float).SetInt(expected)
    
    slippage := new(big.Float).Quo(diffFloat, expectedFloat)
    slippageValue, _ := slippage.Float64()
    
    if slippageValue > maxSlippage {
        return errors.New("slippage dépasse la limite")
    }
    
    return nil
}
```

---

## 7. Tests

```go
package bondingcurve_test

import (
    "math/big"
    "testing"
    
    "yourproject/bondingcurve"
)

func TestBuy(t *testing.T) {
    bc := bondingcurve.NewBondingCurve("test-token", big.NewInt(1_000_000_000_000_000))
    
    solAmount := big.NewInt(1_000_000_000) // 1 SOL
    minTokensOut := big.NewInt(0)
    
    result, err := bc.Buy(solAmount, minTokensOut)
    
    if err != nil {
        t.Fatalf("Erreur lors de l'achat: %v", err)
    }
    
    if !result.Success {
        t.Fatalf("Achat échoué: %s", result.ErrorMessage)
    }
    
    if result.AmountOut.Cmp(big.NewInt(0)) <= 0 {
        t.Fatalf("Montant de tokens reçu invalide")
    }
    
    t.Logf("Tokens reçus: %s", result.AmountOut.String())
    t.Logf("Nouveau prix: %f SOL", result.NewPrice)
}

func TestSell(t *testing.T) {
    bc := bondingcurve.NewBondingCurve("test-token", big.NewInt(1_000_000_000_000_000))
    
    // D'abord acheter
    bc.Buy(big.NewInt(1_000_000_000), big.NewInt(0))
    
    // Ensuite vendre
    tokenAmount := big.NewInt(10_000_000) // 10 tokens
    minSolOut := big.NewInt(0)
    
    result, err := bc.Sell(tokenAmount, minSolOut)
    
    if err != nil {
        t.Fatalf("Erreur lors de la vente: %v", err)
    }
    
    if !result.Success {
        t.Fatalf("Vente échouée: %s", result.ErrorMessage)
    }
    
    t.Logf("SOL reçus: %s", result.AmountOut.String())
    t.Logf("Nouveau prix: %f SOL", result.NewPrice)
}

func TestPriceIncrease(t *testing.T) {
    bc := bondingcurve.NewBondingCurve("test-token", big.NewInt(1_000_000_000_000_000))
    
    initialPrice := bc.GetPrice()
    
    // Acheter plusieurs fois
    bc.Buy(big.NewInt(1_000_000_000), big.NewInt(0))
    bc.Buy(big.NewInt(1_000_000_000), big.NewInt(0))
    bc.Buy(big.NewInt(1_000_000_000), big.NewInt(0))
    
    finalPrice := bc.GetPrice()
    
    if finalPrice <= initialPrice {
        t.Fatalf("Le prix devrait augmenter après des achats")
    }
    
    t.Logf("Prix initial: %f SOL", initialPrice)
    t.Logf("Prix final: %f SOL", finalPrice)
}

func TestConstantProduct(t *testing.T) {
    bc := bondingcurve.NewBondingCurve("test-token", big.NewInt(1_000_000_000_000_000))
    
    k1 := bc.CalculateK()
    
    // Faire un trade
    bc.Buy(big.NewInt(1_000_000_000), big.NewInt(0))
    
    k2 := bc.CalculateK()
    
    // k devrait être approximativement constant (peut varier légèrement à cause des arrondis)
    diff := new(big.Int).Sub(k1, k2)
    if diff.Cmp(big.NewInt(0)) < 0 {
        diff.Neg(diff)
    }
    
    // La différence devrait être minime (< 1%)
    diffFloat := new(big.Float).SetInt(diff)
    k1Float := new(big.Float).SetInt(k1)
    ratio := new(big.Float).Quo(diffFloat, k1Float)
    ratioValue, _ := ratio.Float64()
    
    if ratioValue > 0.01 {
        t.Fatalf("La constante k varie trop: %f%%", ratioValue*100)
    }
    
    t.Logf("k1: %s", k1.String())
    t.Logf("k2: %s", k2.String())
}

func BenchmarkBuy(b *testing.B) {
    bc := bondingcurve.NewBondingCurve("test-token", big.NewInt(1_000_000_000_000_000))
    solAmount := big.NewInt(1_000_000_000)
    minTokensOut := big.NewInt(0)
    
    b.ResetTimer()
    for i := 0; i < b.N; i++ {
        bc.Buy(solAmount, minTokensOut)
    }
}
```

---

## 8. Exemple d'utilisation

```go
package main

import (
    "fmt"
    "math/big"
    
    "yourproject/bondingcurve"
)

func main() {
    // 1. Créer une nouvelle bonding curve
    bc := bondingcurve.NewBondingCurve(
        "token-mint-address",
        big.NewInt(1_000_000_000_000_000),
    )
    
    fmt.Printf("Prix initial: %f SOL\n", bc.GetPrice())
    fmt.Printf("Progression: %.2f%%\n", bc.GetBondingProgress())
    
    // 2. Acheter des tokens
    solAmount := big.NewInt(5_000_000_000) // 5 SOL
    minTokensOut := big.NewInt(0)
    
    result, err := bc.Buy(solAmount, minTokensOut)
    if err != nil {
        fmt.Printf("Erreur: %v\n", err)
        return
    }
    
    fmt.Printf("\n=== ACHAT EFFECTUÉ ===\n")
    fmt.Printf("SOL dépensés: %s\n", solAmount.String())
    fmt.Printf("Tokens reçus: %s\n", result.AmountOut.String())
    fmt.Printf("Nouveau prix: %f SOL\n", result.NewPrice)
    fmt.Printf("Impact prix: %.2f%%\n", result.PriceImpact*100)
    
    // 3. Vérifier la progression
    fmt.Printf("\nProgression: %.2f%%\n", bc.GetBondingProgress())
    
    // 4. Vendre des tokens
    tokenAmount := big.NewInt(50_000_000) // 50 tokens
    minSolOut := big.NewInt(0)
    
    sellResult, err := bc.Sell(tokenAmount, minSolOut)
    if err != nil {
        fmt.Printf("Erreur: %v\n", err)
        return
    }
    
    fmt.Printf("\n=== VENTE EFFECTUÉE ===\n")
    fmt.Printf("Tokens vendus: %s\n", tokenAmount.String())
    fmt.Printf("SOL reçus: %s\n", sellResult.AmountOut.String())
    fmt.Printf("Nouveau prix: %f SOL\n", sellResult.NewPrice)
    fmt.Printf("Impact prix: %.2f%%\n", sellResult.PriceImpact*100)
}
```

---

## 9. Structure du projet

```
bondingcurve/
├── bondingcurve.go      # Structures et méthodes principales
├── calculations.go      # Fonctions de calcul (prix, k, etc.)
├── validation.go        # Fonctions de validation
├── fees.go             # Gestion des frais
├── migration.go        # Logique de migration
├── events.go           # Gestion des événements
├── config.go           # Configuration
├── bondingcurve_test.go # Tests unitaires
└── examples/
    └── main.go         # Exemples d'utilisation
```

---

## 10. Checklist d'implémentation

- [ ] Créer les structures de données (BondingCurve, Config, etc.)
- [ ] Implémenter NewBondingCurve()
- [ ] Implémenter GetPrice()
- [ ] Implémenter CalculateK()
- [ ] Implémenter Buy() avec calculateTokensOut()
- [ ] Implémenter Sell() avec calculateSolOut()
- [ ] Implémenter validateTrade()
- [ ] Implémenter GetBondingProgress()
- [ ] Implémenter shouldMigrate() et migrate()
- [ ] Implémenter la gestion des frais
- [ ] Créer les tests unitaires
- [ ] Créer les benchmarks
- [ ] Ajouter la documentation GoDoc
- [ ] Audit de sécurité

---

**Note** : Cette implémentation Go utilise `math/big` pour une précision maximale avec les grands nombres. C'est essentiel pour les calculs financiers où la précision est critique.