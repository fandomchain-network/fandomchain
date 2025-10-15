# useTradingView Composable

## 📁 Architecture

Le composable `useTradingView.ts` contient toute la logique métier pour la page de trading, séparée du composant Vue.

### Avantages de cette architecture

✅ **Réutilisable** - Peut être utilisé dans plusieurs composants  
✅ **Testable** - Facile à tester unitairement  
✅ **Maintenable** - Logique séparée de la présentation  
✅ **Type-safe** - TypeScript avec interfaces définies  

## 📊 Structure

```
vue/src/
├── def-composables/
│   └── useTradingView.ts       ← Logique métier
└── views/
    └── TradingView.vue          ← Template + UI
```

## 🔧 Utilisation

### Dans un composant Vue

```vue
<script setup lang="ts">
import { useTradingView } from '../def-composables/useTradingView';

const {
  // State
  selectedDenom,
  tokenData,
  currentPrice,
  loading,
  
  // Methods
  loadDenoms,
  loadTokenData,
  executeBuy,
  executeSell,
} = useTradingView();
</script>
```

## 📝 API du Composable

### State (Reactive Refs)

#### Token Data
- `selectedDenom: Ref<string>` - Denom sélectionné
- `denoms: Ref<any[]>` - Liste de tous les denoms
- `tokenData: Ref<TokenData | null>` - Données du token sélectionné
- `currentPrice: Ref<string>` - Prix instantané
- `progress: Ref<string>` - Progression (0-100%)
- `tokensSold: Ref<number>` - Tokens vendus
- `tokensRemaining: Ref<number>` - Tokens disponibles

#### UI State
- `loading: Ref<boolean>` - État de chargement
- `message: Ref<Message | null>` - Message d'erreur/succès

#### Trading State
- `buyAmount: Ref<number>` - Montant FandomChain pour achat
- `sellAmount: Ref<number>` - Montant tokens pour vente
- `buySlippage: Ref<number>` - Tolérance slippage achat (%)
- `sellSlippage: Ref<number>` - Tolérance slippage vente (%)
- `buyEstimate: Ref<BuyEstimate | null>` - Estimation achat
- `sellEstimate: Ref<SellEstimate | null>` - Estimation vente

#### User State
- `userFandomBalance: Ref<string>` - Balance FandomChain
- `userTokenBalance: Ref<string>` - Balance token sélectionné
- `address: Ref<string>` - Adresse wallet connecté

### Methods

#### Data Loading
```typescript
loadDenoms(): Promise<void>
// Charge la liste de tous les tokens disponibles

loadTokenData(): Promise<void>
// Charge les données du token sélectionné (prix, progression, etc.)

loadUserBalances(): Promise<void>
// Charge les balances de l'utilisateur connecté
```

#### Trading Estimates
```typescript
estimateBuy(): Promise<void>
// Estime le nombre de tokens reçus pour un achat
// Utilise: buyAmount
// Met à jour: buyEstimate

estimateSell(): Promise<void>
// Estime le montant FandomChain reçu pour une vente
// Utilise: sellAmount
// Met à jour: sellEstimate
```

#### Trading Execution
```typescript
executeBuy(): Promise<void>
// Exécute une transaction d'achat
// - Calcule le minTokensOut avec slippage
// - Crée et signe la transaction
// - Recharge les données après succès

executeSell(): Promise<void>
// Exécute une transaction de vente
// - Calcule le minFandomOut avec slippage
// - Crée et signe la transaction
// - Recharge les données après succès
```

#### Chart
```typescript
drawChart(canvas: HTMLCanvasElement): void
// Dessine le graphique de bonding curve
// - Génère 50 points de données
// - Affiche la position actuelle en rouge
// - Configure Chart.js

destroyChart(): void
// Nettoie l'instance Chart.js
// À appeler dans onUnmounted()
```

#### Utils
```typescript
formatNumber(num: number | string): string
// Formate un nombre avec séparateurs de milliers
// Exemple: 1000000 → "1,000,000"

showMessage(type: 'error' | 'success', text: string): void
// Affiche un message temporaire (5 secondes)
// Utilise: message ref
```

## 🎯 Interfaces TypeScript

### TokenData
```typescript
interface TokenData {
  denom: string;
  ticker: string;
  description: string;
  owner: string;
  precision: number;
  url: string;
  bonding_curve_enabled: boolean;
  virtual_token_reserves: string;
  virtual_fandom_reserves: string;
  real_token_reserves: string;
  real_fandom_reserves: string;
  initial_virtual_token_reserves: string;
  initial_virtual_fandom_reserves: string;
  initial_real_token_reserves: string;
}
```

### BuyEstimate
```typescript
interface BuyEstimate {
  tokensOut: number;      // Tokens qui seront reçus
  priceImpact: string;    // Impact prix en %
}
```

### SellEstimate
```typescript
interface SellEstimate {
  fandomOut: number;      // FandomChain qui sera reçu
  priceImpact: string;    // Impact prix en %
}
```

### Message
```typescript
interface Message {
  type: 'error' | 'success';
  text: string;
}
```

## 🔄 Flux de données

### Chargement initial
```
loadDenoms() 
  → Récupère tous les denoms
  → Met à jour denoms[]
```

### Sélection d'un token
```
User sélectionne token
  → selectedDenom change
  → loadTokenData()
      → Charge denom
      → Charge price (API REST)
      → Charge progress (API REST)
      → loadUserBalances()
      → Met à jour toutes les refs
```

### Achat
```
User entre montant
  → buyAmount change
  → estimateBuy() (automatique)
      → Appelle API estimate_buy
      → Met à jour buyEstimate
      
User clique "Buy"
  → executeBuy()
      → Calcule minTokensOut avec slippage
      → Crée MsgBuyWithBondingCurve
      → signAndBroadcast()
      → Succès ? → loadTokenData()
```

### Vente
```
User entre montant
  → sellAmount change
  → estimateSell() (automatique)
      → Appelle API estimate_sell
      → Met à jour sellEstimate
      
User clique "Sell"
  → executeSell()
      → Calcule minFandomOut avec slippage
      → Crée MsgSellWithBondingCurve
      → signAndBroadcast()
      → Succès ? → loadTokenData()
```

## ⚙️ Configuration

### API URL
Par défaut : `http://localhost:1317`

Pour changer, modifier dans `useTradingView.ts` :
```typescript
const API_BASE_URL = 'http://localhost:1317';
```

### Slippage par défaut
```typescript
buySlippage: ref(2),   // 2%
sellSlippage: ref(2),  // 2%
```

### Durée d'affichage des messages
```typescript
setTimeout(() => {
  message.value = null;
}, 5000);  // 5 secondes
```

## 🧪 Tests (À implémenter)

### Tests unitaires suggérés
```typescript
describe('useTradingView', () => {
  test('formatNumber formate correctement', () => {
    expect(formatNumber(1000000)).toBe('1,000,000');
  });
  
  test('estimateBuy appelle l\'API', async () => {
    // Mock fetch
    // Tester que buyEstimate est mis à jour
  });
  
  test('executeBuy calcule le slippage correctement', () => {
    // Vérifier minTokensOut = tokensOut * (1 - slippage/100)
  });
});
```

## 🔐 Sécurité

### Validations
- ✅ Vérifie que l'adresse est connectée avant transaction
- ✅ Vérifie que les montants sont > 0
- ✅ Calcule automatiquement la protection slippage
- ✅ Gère les erreurs de transaction

### Bonnes pratiques
- ⚠️ Ne jamais stocker de clés privées
- ⚠️ Toujours utiliser Keplr pour signer
- ⚠️ Valider les entrées utilisateur
- ⚠️ Gérer les erreurs réseau

## 📚 Ressources

- [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [TypeScript avec Vue](https://vuejs.org/guide/typescript/overview.html)
- [Chart.js Documentation](https://www.chartjs.org/docs/latest/)

---

**Créé pour FandomChain Bonding Curve Trading** 🚀

