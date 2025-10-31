#!/usr/bin/env python3
import json
import sys
import subprocess
import os
import datetime
import re
import sys

# Load input from stdin
try:
    input_data = json.load(sys.stdin)
except json.JSONDecodeError as e:
    print(f"Error: Invalid JSON input: {e}", file=sys.stderr)
    sys.exit(1)

# Get the workspace path - should be the repo root
workspace_path = os.environ.get('WORKSPACE_PATH', '/home/berthier/Desktop/Projects/fandomchain-official-repo')

# Check if this is a PreToolUse hook for detecting planned edits
hook_event = input_data.get('hook_event_name', '')
tool_name = input_data.get('tool_name', '')
tool_input = input_data.get('tool_input', {})

# Files to monitor for bonding curve changes
bonding_curve_files = [
    'x/tokenfactory/keeper/bonding_curve.go',
]

# Critical constants that should NOT be modified without extreme caution
CRITICAL_CONSTANTS = {
    'TOKEN_DECIMALS': 'int64(1_000_000)',
    'FANDOMCHAIN_DECIMALS': 'int64(1_000_000_000)',
    'INITIAL_VIRTUAL_TOKEN_RESERVES': 'int64(1_000_000_000_000)',
    'INITIAL_VIRTUAL_FANDOM_RESERVES': 'int64(30_000_000_000)',
    'INITIAL_REAL_TOKEN_RESERVES': 'int64(800_000_000_000)',
    'INITIAL_REAL_FANDOM_RESERVES': 'int64(0)',
    'BUY_FEE_NUMERATOR': 'int64(1)',
    'BUY_FEE_DENOMINATOR': 'int64(100)',
    'SELL_FEE_NUMERATOR': 'int64(1)',
    'SELL_FEE_DENOMINATOR': 'int64(100)',
    'MIN_TRADE_AMOUNT': 'int64(1)',
    'MAX_SLIPPAGE_PERCENT': 'int64(5)',
    'MAX_PRICE_IMPACT_PERCENT': 'int64(10)',
}


def check_constants_modified(file_path):
    """Check if critical constants have been modified in bonding_curve.go"""
    modified_constants = []
    
    try:
        with open(file_path, 'r') as f:
            content = f.read()
            
        for const_name, expected_value in CRITICAL_CONSTANTS.items():
            # Pattern to match: CONST_NAME = value or CONST_NAME = value (with spaces/tabs)
            pattern = rf'{const_name}\s*=\s*([^\s\n]+)'
            match = re.search(pattern, content)
            
            if match:
                actual_value = match.group(1).strip()
                # Normalize spaces in values for comparison
                expected_normalized = expected_value.replace(' ', '').replace('_', '')
                actual_normalized = actual_value.replace(' ', '').replace('_', '')
                
                if expected_normalized != actual_normalized:
                    modified_constants.append({
                        'name': const_name,
                        'expected': expected_value,
                        'actual': actual_value
                    })
    except Exception as e:
        print(f"Warning: Could not check constants: {e}", file=sys.stderr)
    
    return modified_constants


def check_pretool_edit(tool_input):
    """Check if a PreToolUse Edit is trying to modify critical constants"""
    modified_constants = []
    
    if not tool_input:
        return modified_constants
    
    file_path = tool_input.get('file_path', '')
    new_string = tool_input.get('new_string', '')
    old_string = tool_input.get('old_string', '')
    
    # Only check if editing bonding_curve.go
    if 'bonding_curve.go' not in file_path:
        return modified_constants
    
    # Check if any critical constant is being modified
    for const_name, expected_value in CRITICAL_CONSTANTS.items():
        pattern = rf'{const_name}\s*=\s*([^\s\n]+)'
        
        # Check if the old string contains the constant
        old_match = re.search(pattern, old_string)
        new_match = re.search(pattern, new_string)
        
        if old_match and new_match:
            old_value = old_match.group(1).strip()
            new_value = new_match.group(1).strip()
            
            # Normalize for comparison
            old_normalized = old_value.replace(' ', '').replace('_', '')
            new_normalized = new_value.replace(' ', '').replace('_', '')
            
            if old_normalized != new_normalized:
                modified_constants.append({
                    'name': const_name,
                    'expected': old_value,
                    'actual': new_value
                })
    
    return modified_constants

try:
    # Change to workspace directory
    os.chdir(workspace_path)
    
    constants_modified = []
    
    # Check if this is a PreToolUse event trying to edit bonding curve constants
    if hook_event == 'PreToolUse' and tool_name in ['Edit', 'search_replace']:
        constants_modified = check_pretool_edit(tool_input)
        
        if constants_modified:
            const_changes = '\n'.join(
                f'  ❌ {c["name"]}: {c["expected"]} → {c["actual"]}'
                for c in constants_modified
            )
            context = f"""
🚨 BLOCKED: Attempting to modify CRITICAL bonding curve constants! 🚨

{const_changes}

⛔ THESE CONSTANTS SHOULD NEVER BE MODIFIED ⛔

This edit has been BLOCKED because changing these values will:
- Break compatibility with existing tokens
- Affect all active bonding curves
- Potentially cause loss of funds
- Create inconsistent pricing
- Require protocol migration

If you absolutely must change these values:
1. Get explicit authorization from the protocol team
2. Update ALL tests to reflect new values
3. Document breaking changes in CHANGELOG
4. Notify all stakeholders
5. Plan migration strategy for existing tokens

DO NOT PROCEED WITHOUT EXPLICIT APPROVAL!
"""
            output = {
                "decision": "block",
                "reason": context
            }
            print(json.dumps(output))
            sys.exit(1)
        
except subprocess.TimeoutExpired:
    print("Warning: Git status check timed out", file=sys.stderr)
except FileNotFoundError:
    print("Warning: Git not found or workspace directory doesn't exist", file=sys.stderr)
except Exception as e:
    print(f"Warning: Error checking bonding curve files: {e}", file=sys.stderr)

# No bonding curve files modified or error occurred - proceed normally
sys.exit(0)

