# IBC Status Command

Display comprehensive information about all IBC connections, channels, and light clients for FandomChain.

## RPC Endpoint
All queries must use the FandomChain RPC endpoint: `--node https://rpc.fandomchain.com/`

## Tasks

1. **Query IBC Connections**
   - Run `fandomChaind query ibc connection connections --node https://rpc.fandomchain.com/`
   - Display all connections with:
     - Connection ID
     - State (OPEN, INIT, etc.)
     - Client ID
     - Counterparty connection ID
     - Counterparty client ID

2. **Query IBC Channels**
   - Run `fandomChaind query ibc channel channels --node https://rpc.fandomchain.com/`
   - For each channel, display:
     - Channel ID
     - Port ID
     - State (OPEN, INIT, etc.)
     - Counterparty channel ID
     - Counterparty port ID
     - Connection hops
     - Version

3. **Query Light Clients**
   - Run `fandomChaind query ibc client states --node https://rpc.fandomchain.com/`
   - Display all client states with:
     - Client ID
     - Client type (07-tendermint, etc.)
     - Latest height
     - Trust level
     - Trusting period

4. **Check TokenFactory IBC Port**
   - Run `fandomChaind query tokenfactory params --node https://rpc.fandomchain.com/` or check IBC bindings
   - Verify tokenfactory port is bound ("tokenfactory")
   - Check version ("tokenfactory-1")

5. **Test Osmosis Connection (connection-0, channel-0)**
   - Specifically check connection-0 status
   - Verify channel-0 is OPEN
   - Display Osmosis-specific connection details
   - Show last update time if available

6. **Query IBC Transfer Channels**
   - List all transfer channels (port: "transfer")
   - Show which chains are connected via IBC transfer
   - Display channel capabilities

7. **Display Summary**
   Present all information in a structured format:
   ```
   === FandomChain IBC Status ===

   Connections: {count}
   ┌─────────────────┬────────┬─────────────┬──────────────────────┐
   │ Connection ID   │ State  │ Client ID   │ Counterparty Chain   │
   ├─────────────────┼────────┼─────────────┼──────────────────────┤
   │ connection-0    │ OPEN   │ 07-tend...  │ Osmosis              │
   └─────────────────┴────────┴─────────────┴──────────────────────┘

   Channels: {count}
   ┌────────────┬──────────────┬────────┬──────────────────┬─────────────┐
   │ Channel ID │ Port         │ State  │ Counterparty Ch  │ Connection  │
   ├────────────┼──────────────┼────────┼──────────────────┼─────────────┤
   │ channel-0  │ transfer     │ OPEN   │ channel-xxx      │ connection-0│
   │ channel-1  │ tokenfactory │ OPEN   │ channel-yyy      │ connection-0│
   └────────────┴──────────────┴────────┴──────────────────┴─────────────┘

   Light Clients: {count}
   - Client ID: {id} | Type: {type} | Height: {height}

   TokenFactory IBC:
   - Port: tokenfactory
   - Version: tokenfactory-1
   - Status: {bound/unbound}

   Osmosis Connection:
   - Connection: connection-0 ({state})
   - Channel: channel-0 ({state})
   - Last Update: {time}
   - Status: ✓ Operational / ✗ Issues Detected
   ```

8. **Health Check**
   - Verify all connections are in OPEN state
   - Check if any channels are stuck in INIT or other non-OPEN states
   - Warn if light clients are not updating
   - Flag any unusual configurations

9. **Quick Actions**
   Display helpful commands for common IBC operations:
   ```
   Quick IBC Commands:
   - Send tokens: fandomChaind tx ibc-transfer transfer {port} {channel} {receiver} {amount} --node https://rpc.fandomchain.com/
   - Query packet: fandomChaind query ibc channel packet-commitment {port} {channel} {sequence} --node https://rpc.fandomchain.com/
   - Relay pending: Check your relayer status
   ```

## Error Handling
- If RPC endpoint is unreachable, display connection error and verify https://rpc.fandomchain.com/ is accessible
- If no IBC connections exist, display "No IBC connections configured"
- If queries fail, show which specific component failed
- Provide troubleshooting hints for common issues

## Notes
- This command checks the current IBC state
- For relayer status, users need to check their relayer separately
- All heights and times are from the chain's perspective
