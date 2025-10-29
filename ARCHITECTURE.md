# Architecture FandomChain

Documentation complète de l'architecture de la blockchain FandomChain (Cosmos SDK)

---

## 📊 Architecture Globale de FandomChain

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          FANDOMCHAIN BLOCKCHAIN                          │
│                    (Cosmos SDK v0.53.3 + CometBFT)                      │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                          COUCHE APPLICATIVE                              │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌────────────────┐    ┌──────────────┐    ┌────────────────────┐     │
│  │   CLI Client   │    │  TS Client   │    │   Vue.js Frontend  │     │
│  │ (fandomChaind) │    │  (ts-client) │    │      (vue/)        │     │
│  └────────┬───────┘    └──────┬───────┘    └─────────┬──────────┘     │
│           │                    │                      │                 │
│           └────────────────────┼──────────────────────┘                 │
│                                │                                        │
└────────────────────────────────┼────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         COUCHE API (gRPC/REST)                          │
├─────────────────────────────────────────────────────────────────────────┤
│  • Message Router (Tx)                                                  │
│  • Query Server (Queries)                                               │
│  • Event Subscription                                                   │
└─────────────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        APP CORE (app/app.go)                            │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  Module Manager                                                         │
│  ┌───────────────────────────────────────────────────────────────┐     │
│  │ • BeginBlock / EndBlock Handlers                              │     │
│  │ • InitGenesis / ExportGenesis                                 │     │
│  │ • Dependency Injection (depinject)                            │     │
│  └───────────────────────────────────────────────────────────────┘     │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                           COUCHE MODULES                                │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────┐      │
│  │           🌟 MODULE PERSONNALISÉ: TOKENFACTORY               │      │
│  ├──────────────────────────────────────────────────────────────┤      │
│  │                                                              │      │
│  │  Messages:                        Queries:                  │      │
│  │  ┌─────────────────────┐         ┌──────────────────┐       │      │
│  │  │ • CreateDenom       │         │ • BondingCurve   │       │      │
│  │  │ • BuyWithBonding    │         │   Price          │       │      │
│  │  │ • SellWithBonding   │         │ • EstimateBuy    │       │      │
│  │  └─────────┬───────────┘         │ • EstimateSell   │       │      │
│  │            │                     │ • Progress       │       │      │
│  │            ▼                     └──────────────────┘       │      │
│  │  ┌─────────────────────────────────────────────┐            │      │
│  │  │         KEEPER (Business Logic)             │            │      │
│  │  ├─────────────────────────────────────────────┤            │      │
│  │  │                                             │            │      │
│  │  │  🔵 Bonding Curve Engine                    │            │      │
│  │  │  ┌────────────────────────────────────┐    │            │      │
│  │  │  │ • k = x * y (constant product)     │    │            │      │
│  │  │  │ • Virtual Reserves (30 FANDOM)     │    │            │      │
│  │  │  │ • Real Reserves (800k tokens)      │    │            │      │
│  │  │  │ • Trading Fees (1%)                │    │            │      │
│  │  │  │ • Slippage Protection (5% max)     │    │            │      │
│  │  │  └────────────────────────────────────┘    │            │      │
│  │  │                                             │            │      │
│  │  │  🔵 State Management                        │            │      │
│  │  │  ┌────────────────────────────────────┐    │            │      │
│  │  │  │ • Denom Store (Map)                │    │            │      │
│  │  │  │ • Params (Item)                    │    │            │      │
│  │  │  │ • IBC Port (Item)                  │    │            │      │
│  │  │  └────────────────────────────────────┘    │            │      │
│  │  │                                             │            │      │
│  │  └─────────────────────────────────────────────┘            │      │
│  │                                                              │      │
│  └──────────────────────────────────────────────────────────────┘      │
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────┐      │
│  │              MODULES COSMOS SDK STANDARD                     │      │
│  ├──────────────────────────────────────────────────────────────┤      │
│  │                                                              │      │
│  │  💰 Bank    👤 Auth     🔐 Staking   🏛️ Gov                 │      │
│  │  💸 Mint    📊 Distr    ⚔️ Slashing  ⬆️ Upgrade             │      │
│  │  🎫 Feegrant 👥 Group   📜 Evidence  🔑 AuthZ               │      │
│  │  ⏰ Epochs                                                   │      │
│  │                                                              │      │
│  └──────────────────────────────────────────────────────────────┘      │
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────┐      │
│  │                   MODULES IBC                                │      │
│  ├──────────────────────────────────────────────────────────────┤      │
│  │                                                              │      │
│  │  🌉 IBC Core                                                 │      │
│  │  ├─ Transfer (v1, v2)                                        │      │
│  │  ├─ Interchain Accounts (Controller + Host)                 │      │
│  │  └─ TokenFactory IBC Module                                 │      │
│  │                                                              │      │
│  │  Clients supportés:                                          │      │
│  │  • Tendermint Light Client                                  │      │
│  │  • Solo Machine Light Client                                │      │
│  │                                                              │      │
│  └──────────────────────────────────────────────────────────────┘      │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        COUCHE KEEPERS                                   │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  Chaque Keeper gère:                                                    │
│  • État du module (via Collections Framework)                          │
│  • Logique métier                                                       │
│  • Validations                                                          │
│  • Interactions inter-modules                                           │
│                                                                          │
│  ┌────────────┐   ┌────────────┐   ┌─────────────────┐                │
│  │ BankKeeper │──▶│ AuthKeeper │──▶│ TokenfactoryKpr │                │
│  └────────────┘   └────────────┘   └─────────────────┘                │
│        │                                     │                          │
│        └─────────────────┬───────────────────┘                          │
│                          │                                              │
└──────────────────────────┼──────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                   COUCHE STOCKAGE (Collections)                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  Store Service (KVStore)                                                │
│  ┌──────────────────────────────────────────────────────────┐          │
│  │                                                            │          │
│  │  Prefixes par module:                                     │          │
│  │  • tokenfactory/denom/ → Map<string, Denom>              │          │
│  │  • tokenfactory/params → Item<Params>                    │          │
│  │  • tokenfactory/port → Item<string>                      │          │
│  │  • bank/balances → Map<Address, Coins>                   │          │
│  │  • staking/validators → Map<Address, Validator>          │          │
│  │  • ...                                                    │          │
│  │                                                            │          │
│  └──────────────────────────────────────────────────────────┘          │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                     COUCHE CONSENSUS (CometBFT)                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  • Tendermint BFT Consensus (v0.38.17)                                 │
│  • Block Production & Validation                                        │
│  • P2P Network                                                          │
│  • Mempool                                                              │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Flux de Données - Création de Token avec Bonding Curve

```
┌──────────────────────────────────────────────────────────────────────┐
│                    FLUX: CreateDenom + Buy Token                     │
└──────────────────────────────────────────────────────────────────────┘

1️⃣ Utilisateur envoie MsgCreateDenom
   │
   ├─ denom: "streamercoin"
   ├─ description: "Token pour Streamer X"
   ├─ ticker: "STREAM"
   └─ url: "https://..."
   │
   ▼
2️⃣ Message Router → TokenFactory Keeper
   │
   ▼
3️⃣ Validation:
   ├─ Denom unique? ✓
   ├─ Propriétaire valide? ✓
   └─ Format correct? ✓
   │
   ▼
4️⃣ Initialisation Bonding Curve:
   ├─ virtual_token_reserves = 1,000,000
   ├─ virtual_fandom_reserves = 30 FANDOM
   ├─ real_token_reserves = 800,000
   ├─ real_fandom_reserves = 0
   └─ k = 1,000,000 × 30 = 30,000,000 (constant)
   │
   ▼
5️⃣ Bank Keeper: Mint Tokens
   ├─ Mint 800,000 tokens
   └─ Destination: module account
   │
   ▼
6️⃣ État sauvegardé dans Store
   │
   ▼
7️⃣ Événement émis: "tokenfactory.DenomCreated"
   │
   ▼
8️⃣ Utilisateur achète des tokens (MsgBuyWithBondingCurve)
   │
   ├─ fandomAmount: 10 FANDOM
   ├─ minTokensOut: 300,000 (protection slippage)
   │
   ▼
9️⃣ Calcul Bonding Curve:
   │
   ├─ fandomIn = 10 × 0.99 = 9.9 FANDOM (après 1% de frais)
   ├─ newFandomReserves = 30 + 9.9 = 39.9
   ├─ newTokenReserves = 30,000,000 / 39.9 = 751,879
   ├─ tokensOut = 1,000,000 - 751,879 = 248,121 tokens
   │
   ├─ Validation slippage:
   │  └─ 248,121 > 300,000? ❌ Transaction rejettée!
   │
   └─ Si OK: Transfer FANDOM → module, tokens → acheteur
   │
   ▼
🔟 Prix mis à jour automatiquement
   │
   └─ Nouveau prix = 39.9 / 751,879 = 0.000053 FANDOM/token
```

---

## 🏗️ Structure des Dossiers Détaillée

```
fandomchain/
│
├── app/                          # 🏛️ Application Core
│   ├── app.go                   # Initialisation de l'app
│   ├── app_config.go            # Configuration des modules
│   └── ibc.go                   # Configuration IBC
│
├── cmd/fandomChaind/            # 🖥️ CLI Binary
│   ├── main.go                  # Point d'entrée
│   └── cmd/
│       └── root.go              # Commandes racine
│
├── x/tokenfactory/              # ⭐ Module Principal Personnalisé
│   ├── keeper/                  # 🔧 Logique métier
│   │   ├── keeper.go            # Keeper principal
│   │   ├── bonding_curve.go     # AMM + calculs prix
│   │   ├── msg_server_denom.go  # Handlers de messages
│   │   ├── query_bonding_curve.go # Query handlers
│   │   └── genesis.go           # État genesis
│   │
│   ├── types/                   # 📦 Définitions de types
│   │   ├── keys.go              # Clés de stockage
│   │   ├── messages_denom.go    # Types de messages
│   │   ├── expected_keepers.go  # Interfaces
│   │   └── codec.go             # Encodage
│   │
│   ├── module/                  # 🔌 Enregistrement module
│   │   ├── module.go            # Module de base
│   │   ├── module_ibc.go        # Interface IBC
│   │   ├── depinject.go         # Injection de dépendances
│   │   └── autocli.go           # CLI auto-générée
│   │
│   └── simulation/              # 🧪 Tests simulation
│
├── proto/fandomchain/           # 📋 Protocol Buffers
│   └── tokenfactory/
│       └── v1/
│           ├── tx.proto         # Définitions messages
│           ├── query.proto      # Définitions queries
│           └── genesis.proto    # État genesis
│
├── ts-client/                   # 📚 Client TypeScript
│   └── Generated client library
│
├── vue/                         # 🎨 Frontend Vue.js
│   └── Interface utilisateur
│
├── config.yml                   # ⚙️ Config Ignite Chain
├── genesis.json                 # 🌍 État genesis
└── go.mod                       # 📦 Dépendances Go
```

---

## 🔑 Concepts Clés

### 1. Bonding Curve (Courbe de Liaison)

```
Prix                          ┌─────────────────
 │                           ╱
 │                         ╱
 │                       ╱
 │                     ╱
 │                   ╱
 │                 ╱
 │               ╱
 │             ╱
 │           ╱
 │         ╱
 │       ╱
 │     ╱
 │   ╱
 │ ╱
 └────────────────────────────────────────► Tokens vendus

 k = x × y (constant product)

 - x = réserves de tokens
 - y = réserves de FANDOM
 - k = constante (produit des réserves)

 Plus on achète → Prix augmente
 Plus on vend → Prix diminue
```

#### Paramètres de la Bonding Curve

**Fichier source:** `x/tokenfactory/keeper/bonding_curve.go`

**Constantes:**
- **Token Decimals:** 10^6 (6 decimals)
- **FandomChain Decimals:** 10^9 (9 decimals)
- **Initial Virtual Token Reserves:** 1,000,000 tokens
- **Initial Virtual Fandom Reserves:** 30 FandomChain
- **Initial Real Token Reserves:** 800,000 tokens
- **Trading Fees:** 1% (buy et sell)

**Formules:**
```
Buy: tokensOut = tokenReserves - (k / (fandomReserves + fandomIn))
Sell: fandomOut = fandomReserves - (k / (tokenReserves + tokenIn))

où k = fandomReserves × tokenReserves (constant product)
```

**Protections:**
- **Slippage Protection:** 5% maximum
- **Price Impact:** 10% maximum
- **Minimum Trade Amounts:** Validation des montants positifs
- **Reserve Validation:** Vérification de la cohérence des réserves

---

### 2. Module Account

```
Module Account: tokenfactory
├─ Permissions:
│  ├─ Minter  (créer des tokens)
│  ├─ Burner  (brûler des tokens)
│  └─ Staking (participer au staking)
│
└─ Contient:
   ├─ Réserves de tokens pour bonding curves
   ├─ Frais collectés (1% par trade)
   └─ Pool de liquidité
```

---

### 3. Token Natif

```
Nom: fandomChain
Base Unit: ufandomChain (micro)
Decimals: 9

1 fandomChain = 1,000,000,000 ufandomChain

Usage:
├─ Frais de transaction (gas)
├─ Staking (validation)
├─ Gouvernance (votes)
└─ Trading sur bonding curves
```

**Configuration:**
- **Account Prefix:** "fandom"
- **Coin Type:** 118 (standard Cosmos)
- **Base Denom:** "ufandomChain"
- **Display Denom:** "fandomChain"
- **Exponent:** 9

---

## 📋 Module TokenFactory - API

### Messages (Transactions)

#### 1. MsgCreateDenom
Crée une nouvelle dénomination de token avec bonding curve

**Champs:**
```protobuf
string owner = 1;        // Adresse du créateur
string denom = 2;        // Identifiant unique du token
string description = 3;  // Description
string ticker = 4;       // Symbole (ex: STREAM)
string url = 5;          // URL associée
```

**Effets:**
- Initialise une bonding curve avec paramètres par défaut
- Mint 800,000 tokens vers le module account
- Enregistre le denom dans le store
- Émet un événement `DenomCreated`

---

#### 2. MsgBuyWithBondingCurve
Achète des tokens via la bonding curve

**Champs:**
```protobuf
string buyer = 1;           // Adresse de l'acheteur
string denom = 2;           // Token à acheter
int64 fandomAmount = 3;     // Montant FANDOM à dépenser
int64 minTokensOut = 4;     // Minimum de tokens attendus (slippage protection)
```

**Processus:**
1. Applique 1% de frais sur le montant FANDOM
2. Calcule les tokens à recevoir via la formule AMM
3. Vérifie la protection slippage
4. Transfère FANDOM de l'acheteur vers le module
5. Transfère tokens du module vers l'acheteur
6. Met à jour les réserves
7. Émet un événement `TokensPurchased`

---

#### 3. MsgSellWithBondingCurve
Vend des tokens via la bonding curve

**Champs:**
```protobuf
string seller = 1;          // Adresse du vendeur
string denom = 2;           // Token à vendre
int64 tokenAmount = 3;      // Quantité de tokens à vendre
int64 minFandomOut = 4;     // Minimum de FANDOM attendu (slippage protection)
```

**Processus:**
1. Calcule le FANDOM à recevoir via la formule AMM
2. Applique 1% de frais
3. Vérifie la protection slippage
4. Transfère tokens du vendeur vers le module
5. Transfère FANDOM du module vers le vendeur
6. Met à jour les réserves
7. Émet un événement `TokensSold`

---

### Queries (Lecture)

#### 1. GetBondingCurvePrice
Retourne le prix actuel d'un token

**Paramètres:**
- `denom` (string): Identifiant du token

**Réponse:**
```protobuf
int64 price = 1;  // Prix en FANDOM par token
```

---

#### 2. GetBondingCurveProgress
Retourne la progression de vente de la bonding curve

**Paramètres:**
- `denom` (string): Identifiant du token

**Réponse:**
```protobuf
int64 tokensSold = 1;        // Tokens vendus
int64 tokensRemaining = 2;   // Tokens restants
int64 progressPercent = 3;   // Pourcentage de complétion
```

---

#### 3. EstimateBuy
Estime le nombre de tokens reçus pour un achat

**Paramètres:**
- `denom` (string): Identifiant du token
- `fandomAmount` (int64): Montant FANDOM à dépenser

**Réponse:**
```protobuf
int64 tokensOut = 1;      // Tokens estimés
int64 priceImpact = 2;    // Impact sur le prix (%)
int64 fees = 3;           // Frais appliqués
```

---

#### 4. EstimateSell
Estime le montant FANDOM reçu pour une vente

**Paramètres:**
- `denom` (string): Identifiant du token
- `tokenAmount` (int64): Quantité de tokens à vendre

**Réponse:**
```protobuf
int64 fandomOut = 1;      // FANDOM estimé
int64 priceImpact = 2;    // Impact sur le prix (%)
int64 fees = 3;           // Frais appliqués
```

---

## 🌉 Connexions IBC

```
FandomChain
    │
    │ IBC Connection
    │
    ├──────────────────────┐
    │                      │
    ▼                      ▼
 Osmosis              Autres chains
 (chain-id:           (potentiel)
  osmosis-1)
    │
    └─ Channel: channel-0
       Type: transfer
       Client: 07-tendermint-0
       Connection: connection-0
```

### Capacités IBC

**Modules IBC supportés:**
- **IBC Transfer (v1, v2):** Transferts de tokens entre chains
- **Interchain Accounts (Controller + Host):** Contrôle de comptes sur d'autres chains
- **TokenFactory IBC Module:** Module personnalisé IBC-enabled

**Light Clients supportés:**
- Tendermint Light Client (07-tendermint)
- Solo Machine Light Client (06-solomachine)

**Configuration IBC du module TokenFactory:**
```go
// IBC Version
Version: "tokenfactory-1"

// IBC Port
Port: "tokenfactory"

// Channel Configuration
Ordering: UNORDERED
Version: "tokenfactory-1"
```

---

## 🔄 Cycle de Vie des Modules

### Module Manager Order

#### PreBlockers
1. upgrade
2. auth

#### BeginBlockers
1. mint
2. distribution
3. slashing
4. evidence
5. staking
6. authz
7. epochs
8. ibc
9. **tokenfactory** ⭐

#### EndBlockers
1. gov
2. staking
3. feegrant
4. group
5. **tokenfactory** ⭐

#### InitGenesis Order
1. consensus → auth → bank → distribution
2. staking → slashing → gov → mint → genutil
3. IBC modules (ibc, transfer, interchain-accounts)
4. **tokenfactory** ⭐ (custom module last)

---

## 🔧 Configuration Technique

### Versions et Dépendances

**Fichier:** `go.mod`

```
Cosmos SDK: v0.53.3
CometBFT: v0.38.17
IBC: v10.2.0
Go: 1.25.1
```

### Configuration Genesis

**Fichier:** `config.yml`

**Comptes initiaux:**
```yaml
- name: admin1
  coins: ["20000000fandomChain"]

- name: admin2
  coins: ["20000000fandomChain"]
```

**Validateurs:**
```yaml
- name: admin1
  bonded: "10000fandomChain"

- name: validator1
  bonded: "200000fandomChain"

- name: validator2
  bonded: "100000fandomChain"
```

---

## 🔐 Sécurité

### Validations et Protections

**Dans la Bonding Curve (`bonding_curve.go`):**

1. **Validation des montants:**
   - Montants strictement positifs
   - Vérification de cohérence des réserves
   - Validation des balances avant transferts

2. **Protection Slippage:**
   - Maximum 5% de slippage autorisé
   - Paramètre `minTokensOut` / `minFandomOut` obligatoire
   - Rejet de la transaction si dépassement

3. **Price Impact:**
   - Calcul de l'impact sur le prix
   - Limite à 10% maximum
   - Avertissement si impact élevé

4. **Frais de Trading:**
   - 1% sur tous les achats
   - 1% sur toutes les ventes
   - Frais collectés par le module account

5. **IBC Security:**
   - User-initiated channel closing disabled
   - Validation des packets IBC
   - Timeout handling

---

## 📊 État et Stockage

### Collections Framework

Le module utilise le framework `collections` de Cosmos SDK pour la gestion d'état typée:

```go
// Store Keys
type Keeper struct {
    Params collections.Item[types.Params]
    Denom  collections.Map[string, types.Denom]
    Port   collections.Item[string]
}
```

### Structure Denom

```protobuf
message Denom {
  // Metadata
  string denom = 1;
  string description = 2;
  string ticker = 3;
  int64 precision = 4;
  string url = 5;
  string owner = 6;

  // Bonding Curve State
  int64 virtual_token_reserves = 7;
  int64 virtual_fandom_reserves = 8;
  int64 real_token_reserves = 9;
  int64 real_fandom_reserves = 10;
  int64 initial_virtual_token_reserves = 11;
  int64 initial_virtual_fandom_reserves = 12;
  int64 initial_real_token_reserves = 13;
  bool bonding_curve_enabled = 14;
}
```

### Prefixes de Stockage

```
tokenfactory/denom/{denom}     → Denom object
tokenfactory/params            → Module parameters
tokenfactory/port              → IBC port binding
```

---

## 🎯 Cas d'Usage

### Exemple 1: Création de Token par un Streamer

```bash
# 1. Créer le token
fandomChaind tx tokenfactory create-denom \
  --denom "streamercoin" \
  --description "Token de mon stream" \
  --ticker "STREAM" \
  --url "https://mystream.tv" \
  --from streamer

# 2. Vérifier la bonding curve
fandomChaind query tokenfactory bonding-curve-price streamercoin

# 3. Un fan achète des tokens
fandomChaind tx tokenfactory buy-with-bonding-curve \
  --denom "streamercoin" \
  --fandom-amount 10000000 \  # 10 FANDOM
  --min-tokens-out 200000 \   # Slippage protection
  --from fan1

# 4. Vérifier la progression
fandomChaind query tokenfactory bonding-curve-progress streamercoin
```

---

### Exemple 2: Trading de Tokens

```bash
# Estimer un achat
fandomChaind query tokenfactory estimate-buy \
  --denom "streamercoin" \
  --fandom-amount 50000000  # 50 FANDOM

# Effectuer l'achat
fandomChaind tx tokenfactory buy-with-bonding-curve \
  --denom "streamercoin" \
  --fandom-amount 50000000 \
  --min-tokens-out 800000 \
  --from trader

# Estimer une vente
fandomChaind query tokenfactory estimate-sell \
  --denom "streamercoin" \
  --token-amount 500000

# Effectuer la vente
fandomChaind tx tokenfactory sell-with-bonding-curve \
  --denom "streamercoin" \
  --token-amount 500000 \
  --min-fandom-out 25000000 \
  --from trader
```

---

## 🧪 Testing

### Structure de Test

**Fichier:** `x/tokenfactory/simulation/`

Le module inclut des tests de simulation pour:
- Création de denoms
- Trading sur bonding curves
- Scénarios edge cases
- Performance sous charge

### Commandes de Test

```bash
# Tests unitaires
go test ./x/tokenfactory/...

# Tests de simulation
make test-sim-nondeterminism
make test-sim-import-export
make test-sim-after-import
```

---

## 🚀 Points d'Entrée Principaux

### 1. Chain Initialization
**Fichier:** `app/app.go`
**Fonction:** `New()`

Point d'entrée principal pour l'initialisation de l'application blockchain.

---

### 2. Module Registration
**Fichier:** `app/app_config.go`
**Variable:** `appConfig`

Configuration et enregistrement de tous les modules.

---

### 3. CLI Entry Point
**Fichier:** `cmd/fandomChaind/main.go`
**Fonction:** `main()`

Point d'entrée du binaire CLI.

---

### 4. Keeper Initialization
**Fichier:** `x/tokenfactory/keeper/keeper.go`
**Fonction:** `NewKeeper()`

Initialisation du keeper du module tokenfactory.

---

### 5. Message Handlers
**Fichier:** `x/tokenfactory/keeper/msg_server_denom.go`

Handlers pour tous les messages du module.

---

## 📈 Métriques et Observabilité

### Événements Émis

Le module émet les événements suivants:

```
tokenfactory.DenomCreated
├─ denom: string
├─ owner: string
└─ ticker: string

tokenfactory.TokensPurchased
├─ buyer: string
├─ denom: string
├─ fandom_spent: int64
├─ tokens_received: int64
└─ new_price: int64

tokenfactory.TokensSold
├─ seller: string
├─ denom: string
├─ tokens_sold: int64
├─ fandom_received: int64
└─ new_price: int64
```

---

## 🔗 Ressources

### Fichiers Clés

| Fichier | Description |
|---------|-------------|
| `app/app.go` | Application core |
| `x/tokenfactory/keeper/bonding_curve.go` | Logique AMM |
| `x/tokenfactory/keeper/msg_server_denom.go` | Message handlers |
| `proto/fandomchain/tokenfactory/v1/tx.proto` | Définitions messages |
| `config.yml` | Configuration Ignite |
| `genesis.json` | État genesis |

### Commandes Utiles

```bash
# Démarrer le node
fandomChaind start

# Vérifier le statut
fandomChaind status

# Lister les clés
fandomChaind keys list

# Requête balance
fandomChaind query bank balances <address>

# Créer un validateur
fandomChaind tx staking create-validator [flags]
```

---

## 🎓 Résumé

**FandomChain** est une blockchain Cosmos Layer 1 spécialisée qui offre:

✅ **Token Factory avec Bonding Curves** - Création automatisée de tokens pour streamers
✅ **AMM Intégré** - Market maker automatique avec formule constant product (k = x × y)
✅ **Protection DeFi** - Slippage protection, price impact limits, trading fees
✅ **IBC-Enabled** - Communication inter-chain avec Osmosis et autres chains Cosmos
✅ **Architecture Modulaire** - Cosmos SDK standard avec module personnalisé propre
✅ **Sécurisé** - Validations multiples, protections intégrées, événements traçables

**Cas d'usage principal:** Permettre aux streamers de créer facilement leurs propres tokens avec un système de pricing automatique basé sur l'offre et la demande, sans avoir besoin de connaissances techniques approfondies en DeFi.

---

*Documentation générée le 2025-10-29*
*FandomChain - Blockchain for Streamers*
