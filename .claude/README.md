# Claude Code Configuration

This directory contains Claude Code configuration for the FandomChain project.

## Hooks Configuration

The project uses automated hooks to maintain code quality and consistency.

### Active Hooks

#### 1. **User Prompt Submit Hook**
Runs before commits when Go or Proto files are staged:
- Executes unit tests (`make test-unit`)
- Runs linting (`make lint`)
- Ensures code quality before commits

#### 2. **After Edit Hooks**

**Proto Regeneration:**
- Triggers when `.proto` files are edited
- Automatically runs `make proto-gen`
- Keeps Go code in sync with proto definitions

**Bonding Curve Validation:**
- Alerts when `bonding_curve.go` is modified
- Reminds to verify critical constants:
  - INITIAL_VIRTUAL_TOKEN_RESERVES = 1,000,000
  - INITIAL_VIRTUAL_FANDOM_RESERVES = 30
  - INITIAL_REAL_TOKEN_RESERVES = 800,000

**Architecture Documentation:**
- Reminds to update `ARCHITECTURE.md` when business logic changes
- Triggers on keeper or types modifications

**IBC Module Warnings:**
- Alerts when IBC-related files are modified
- Suggests running `/ibc-status` to verify connections

#### 3. **Before Write Hook**
- Validates Go file formatting
- Prevents writing improperly formatted code
- Suggests running `gofmt` if needed

#### 4. **Before Commit Hooks**

**Genesis Validation:**
- Warns when `genesis.json` is modified
- Reminds to check testnet compatibility

**Security Checks:**
- Runs `make govulncheck` before commits
- Detects known Go vulnerabilities

### Permissions

The following commands are pre-authorized:
- `git add` and `git commit` operations
- `make test-unit`, `make lint`, `make proto-gen`
- `make govulncheck`
- `gofmt` formatting

### Customization

To modify hooks, edit `.claude/settings.json`.

To add user-specific settings (not committed to git), use `.claude/settings.local.json`.

### Testing Hooks

You can test individual hooks by triggering their conditions:
- Edit a `.proto` file to test proto regeneration
- Modify `bonding_curve.go` to see validation warnings
- Stage Go files and commit to test pre-commit checks

### Disabling Hooks

To temporarily disable hooks, you can:
1. Set environment variable: `SKIP_HOOKS=1`
2. Comment out specific hooks in `settings.json`
3. Use `--no-verify` flag with git commands (not recommended)

## Slash Commands

Custom slash commands are defined in the `commands/` directory:
- `/ibc-status` - Display comprehensive IBC connection status
- `/analyze-denom <denom>` - Analyze token bonding curve state
- `/update-readme` - Update the project README.md

See individual command files for usage details.

## MCP Servers

The project uses the following MCP servers:
- **context7** - Up-to-date library documentation

Configured in `.mcp.json` at the project root.
