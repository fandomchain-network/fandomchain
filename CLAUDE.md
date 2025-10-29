# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FandomChain is a Cosmos SDK Layer 1 blockchain (v0.53.3) built for streamers, featuring a custom TokenFactory module that enables automated token creation with bonding curve mechanics. The chain uses CometBFT v0.38.17 for consensus and IBC v10.2.0 for cross-chain communication.

**Key Technical Details:**
- Binary name: `fandomChaind`
- Account prefix: `fandom`
- Native token: `ufandomChain` (9 decimals: 1 fandomChain = 10^9 ufandomChain)
- Go version: 1.25.1
- Built with Ignite CLI

## Development Commands

### Building & Installation

```bash
# Install the binary (builds and installs to $GOPATH/bin)
make install

# Verify dependencies
go mod verify
```

### Testing

```bash
# Run all tests (includes govet, govulncheck, and unit tests)
make test

# Run unit tests only
make test-unit

# Run tests with race condition detection
make test-race

# Generate coverage report (creates HTML output)
make test-cover

# Run benchmarks
make bench
```

### Linting & Code Quality

```bash
# Run linter
make lint

# Run linter and auto-fix issues
make lint-fix

# Run go vet
make govet

# Check for known vulnerabilities
make govulncheck
```

### Protobuf Generation

```bash
# Generate Go code from .proto files using Ignite
make proto-gen

# Note: Ignite CLI is the preferred method for proto generation
# Proto files are in: proto/fandomchain/tokenfactory/v1/
```

### Running the Chain

```bash
# Start the node (after installation)
fandomChaind start

# Check node status
fandomChaind status

# Initialize chain (for fresh setup)
ignite chain serve

# Build without installing
ignite chain build
```

## Architecture Overview

### Core Components

**App Structure (`app/`):**
- `app.go` - Main application initialization, keeper setup, and module wiring
- `app_config.go` - Module configuration and lifecycle ordering (BeginBlock, EndBlock, InitGenesis)
- `ibc.go` - IBC router configuration and light client setup

**Custom Module (`x/tokenfactory/`):**
The TokenFactory module implements an Automated Market Maker (AMM) using constant product formula (k = x × y):

```
x/tokenfactory/
├── keeper/
│   ├── bonding_curve.go       # AMM calculations (buy/sell formulas)
│   ├── msg_server_denom.go    # Message handlers (CreateDenom, Buy, Sell)
│   ├── query_bonding_curve.go # Query handlers (price, estimates, progress)
│   └── keeper.go              # State management using Collections framework
├── types/
│   ├── keys.go                # Storage key prefixes
│   ├── messages_denom.go      # Message type definitions
│   └── expected_keepers.go    # Keeper interfaces (BankKeeper, AuthKeeper)
└── module/
    ├── module.go              # Module implementation
    ├── module_ibc.go          # IBC module interface
    └── depinject.go           # Dependency injection setup
```

**Entry Point (`cmd/fandomChaind/`):**
- CLI commands and binary entry point
- Inherits standard Cosmos SDK commands

### Bonding Curve Mechanics

**Constants (in `x/tokenfactory/keeper/bonding_curve.go`):**
```
TOKEN_DECIMALS:                  10^6 (6 decimals)
FANDOMCHAIN_DECIMALS:            10^9 (9 decimals)
INITIAL_VIRTUAL_TOKEN_RESERVES:  1,000,000 tokens
INITIAL_VIRTUAL_FANDOM_RESERVES: 30 FANDOM
INITIAL_REAL_TOKEN_RESERVES:     800,000 tokens
BUY_FEE:                         1%
SELL_FEE:                        1%
MAX_SLIPPAGE_PERCENT:            5%
MAX_PRICE_IMPACT_PERCENT:        10%
```

**Trading Formulas:**
- Buy: `tokensOut = tokenReserves - (k / (fandomReserves + fandomIn))`
- Sell: `fandomOut = fandomReserves - (k / (tokenReserves + tokenIn))`
- Where `k = fandomReserves × tokenReserves` (constant product invariant)

### State Management

Uses Cosmos SDK Collections framework for type-safe state storage:
```go
Params: collections.Item[types.Params]      // Module parameters
Denom:  collections.Map[string, types.Denom] // Token denomination storage
Port:   collections.Item[string]            // IBC port binding
```

Each `Denom` stores:
- Metadata (denom, description, ticker, owner)
- Bonding curve reserves (virtual and real)
- Initial parameters
- Enabled/disabled state

### Module Lifecycle Order

**BeginBlock:** mint → distribution → slashing → evidence → staking → authz → epochs → ibc → **tokenfactory**

**EndBlock:** gov → staking → feegrant → group → **tokenfactory**

**InitGenesis:** Standard modules first → IBC modules → **tokenfactory** (last)

### IBC Integration

- **IBC Port:** "tokenfactory"
- **IBC Version:** "tokenfactory-1"
- **Connected Chains:** Osmosis (connection-0, channel-0)
- Custom IBC module implementation in `x/tokenfactory/module/module_ibc.go`
- Supports IBC Transfer (v1, v2) and Interchain Accounts

## Key Implementation Details

### Message Handlers (`x/tokenfactory/keeper/msg_server_denom.go`)

**CreateDenom:**
1. Validates denom uniqueness
2. Initializes bonding curve with preset constants
3. Mints initial token supply to module account
4. Stores denom metadata and reserves

**BuyWithBondingCurve:**
1. Applies 1% fee on input FANDOM
2. Calculates tokens out using AMM formula
3. Validates slippage protection (minTokensOut)
4. Transfers FANDOM from buyer to module
5. Transfers tokens from module to buyer
6. Updates reserves

**SellWithBondingCurve:**
1. Calculates FANDOM out using AMM formula
2. Applies 1% fee on output
3. Validates slippage protection (minFandomOut)
4. Transfers tokens from seller to module
5. Transfers FANDOM from module to seller
6. Updates reserves

### Testing Patterns

Tests should be written in `*_test.go` files alongside implementation:
- Use `testutil/` for shared test utilities
- Follow standard Cosmos SDK testing patterns with keeper test suites
- Mock keeper dependencies using expected keeper interfaces in `types/expected_keepers.go`

### Proto Files

Protocol buffer definitions in `proto/fandomchain/tokenfactory/v1/`:
- `tx.proto` - Message definitions (CreateDenom, Buy, Sell)
- `query.proto` - Query service definitions
- `genesis.proto` - Genesis state structure

After modifying proto files, regenerate with `make proto-gen`.

### Configuration Files

**`config.yml`** (Ignite Chain configuration):
- Defines initial accounts, validators, faucet
- Sets default denom to `ufandomChain`
- Configures TypeScript client and OpenAPI generation paths

**`genesis.json`** (exported genesis state):
- Contains initial chain state
- Can be modified for testnet/mainnet deployment

## Common Workflows

### Adding a New Message Type

1. Define message in `proto/fandomchain/tokenfactory/v1/tx.proto`
2. Run `make proto-gen` to generate Go types
3. Implement handler in `x/tokenfactory/keeper/msg_server_*.go`
4. Add message constructor in `x/tokenfactory/types/messages_*.go`
5. Register message type in codec (`types/codec.go`)
6. Add CLI command (auto-generated via autocli)
7. Write unit tests

### Adding a New Query

1. Define query in `proto/fandomchain/tokenfactory/v1/query.proto`
2. Run `make proto-gen`
3. Implement handler in `x/tokenfactory/keeper/query_*.go`
4. CLI query auto-generated via autocli configuration

### Modifying Bonding Curve Parameters

All bonding curve constants are in `x/tokenfactory/keeper/bonding_curve.go`:
- Modify constants at the top of the file
- Ensure decimal precision calculations remain consistent
- Update `InitializeBondingCurve()` function if needed
- Add migration logic if changing existing chain state

### Working with Keepers

The TokenFactory keeper requires these dependencies (injected via depinject):
- `AuthKeeper` - Account management
- `BankKeeper` - Token transfers and minting
- `IBCKeeper` - IBC operations (provided as function to avoid circular deps)

Access other keepers through expected keeper interfaces defined in `x/tokenfactory/types/expected_keepers.go`.

### Debugging Tips

- Chain logs are verbose by default when running `ignite chain serve`
- Use `fandomChaind query tokenfactory bonding-curve-price <denom>` to check current prices
- Use `fandomChaind query bank balances <address>` to verify token balances
- Module account address can be queried with `fandomChaind query auth module-account tokenfactory`
- Events are emitted for all state changes - use `--events` flag to see transaction events

## Module Account Permissions

The TokenFactory module account has three permissions:
- `minter` - Can mint new tokens
- `burner` - Can burn tokens
- `staking` - Can participate in staking operations

These permissions are configured in `app/app_config.go`.

## Important Constraints

- Token decimals are fixed at 6 (for created tokens)
- Native token decimals are fixed at 9 (ufandomChain)
- Bonding curve parameters are set at denom creation and immutable
- Each denom name must be globally unique
- All bonding curve calculations use `math.Int` for precision
- IBC channel closing is disabled for user-initiated requests

## References

- Cosmos SDK: https://docs.cosmos.network
- CometBFT: https://docs.cometbft.com
- IBC Protocol: https://ibc.cosmos.network
- Ignite CLI: https://docs.ignite.com
- Architecture diagram: `ARCHITECTURE.md` (detailed technical documentation)
