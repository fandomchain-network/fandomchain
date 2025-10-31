# Analyze Denom Command

Analyze a FandomChain token denom and display comprehensive information about its bonding curve state.

## RPC Endpoint
All queries must use the FandomChain RPC endpoint: `--node https://rpc.fandomchain.com/`

## Parameters
- `{denom}` - The denom to analyze (e.g., "factory/fandom1.../mytoken")

## Tasks

1. **Query Denom Information**
   - Run `fandomChaind query tokenfactory denom {denom} --node https://rpc.fandomchain.com/` to get denom metadata
   - Display: owner, description, ticker, enabled status

2. **Query Bonding Curve State**
   - Run `fandomChaind query tokenfactory bonding-curve-state {denom} --node https://rpc.fandomchain.com/`
   - Display current reserves (virtual and real for both token and FANDOM)
   - Calculate and show:
     - Current k value (constant product)
     - Real token supply distributed (INITIAL_REAL_TOKEN_RESERVES - current real reserves)
     - Percentage of curve completed

3. **Query Current Price**
   - Run `fandomChaind query tokenfactory bonding-curve-price {denom} --node https://rpc.fandomchain.com/`
   - Display current buy and sell prices in FANDOM per token

4. **Query Bonding Curve Progress**
   - Run `fandomChaind query tokenfactory bonding-curve-progress {denom} --node https://rpc.fandomchain.com/`
   - Display progress percentage and tokens remaining

5. **Query Module Account Balance**
   - Get the module account address with `fandomChaind query auth module-account tokenfactory --node https://rpc.fandomchain.com/`
   - Query balance for the specific denom
   - Verify reserves match actual balances

6. **Display Summary**
   Present all information in a clear, formatted output:
   ```
   === Denom Analysis: {denom} ===

   Metadata:
   - Owner: {owner}
   - Ticker: {ticker}
   - Description: {description}
   - Status: {enabled/disabled}

   Bonding Curve State:
   - Virtual Token Reserves: {amount}
   - Virtual FANDOM Reserves: {amount}
   - Real Token Reserves: {amount}
   - Real FANDOM Reserves: {amount}
   - Constant Product (k): {k_value}

   Trading Info:
   - Current Buy Price: {price} FANDOM/token
   - Current Sell Price: {price} FANDOM/token
   - Tokens Distributed: {amount} ({percentage}%)
   - Tokens Remaining: {amount}

   Liquidity:
   - Module Account Balance: {balance}
   - Reserve Verification: {PASS/FAIL}
   ```

7. **Health Check**
   - Verify that reserves are mathematically consistent
   - Check if denom is enabled
   - Warn if any anomalies detected

## Error Handling
- If denom doesn't exist, display clear error message
- If RPC endpoint is unreachable, display connection error and verify https://rpc.fandomchain.com/ is accessible
- If queries fail, show which specific query failed and why
