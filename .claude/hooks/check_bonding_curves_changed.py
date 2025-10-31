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

# Files to monitor for bonding curve changes
bonding_curve_files = [
    'x/tokenfactory/keeper/bonding_curve.go',
    'proto/fandomchain/tokenfactory/v1/denom.proto',
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

try:
    # Change to workspace directory
    os.chdir(workspace_path)
    
    # Check git status for modified files
    result = subprocess.run(
        ['git', 'status', '--porcelain'],
        capture_output=True,
        text=True,
        timeout=5
    )
    
    if result.returncode == 0:
        modified_files = result.stdout.strip().split('\n')
        changed_bonding_files = []
        constants_modified = []
        
        for line in modified_files:
            if line.strip():
                # Parse git status output (format: "XY filename")
                status = line[:2]
                filename = line[3:].strip()
                
                # Check if any bonding curve file is modified
                for monitored_file in bonding_curve_files:
                    if monitored_file in filename:
                        changed_bonding_files.append(filename)
                        
                        # If bonding_curve.go is modified, check critical constants
                        if filename == 'x/tokenfactory/keeper/bonding_curve.go':
                            constants_modified = check_constants_modified(filename)
        
        # If critical constants have been modified - CRITICAL WARNING
        if constants_modified:
            const_changes = '\n'.join(
                f'  ❌ {c["name"]}: {c["expected"]} → {c["actual"]}'
                for c in constants_modified
            )
            context = f"""
🚨 CRITICAL: BONDING CURVE CONSTANTS MODIFIED! 🚨 (detected at {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')})

{const_changes}

⛔ THESE CONSTANTS SHOULD NEVER BE MODIFIED WITHOUT APPROVAL ⛔

Changing these values will:
- Break compatibility with existing tokens
- Affect all active bonding curves
- Potentially cause loss of funds
- Create inconsistent pricing
- Require protocol migration

REQUIRED ACTIONS BEFORE COMMITTING:
1. Revert these changes unless explicitly authorized
2. If authorized: Update ALL tests to reflect new values
3. Document the breaking changes in CHANGELOG
4. Notify all stakeholders
5. Plan migration strategy for existing tokens

DO NOT COMMIT THESE CHANGES WITHOUT EXPLICIT APPROVAL!
"""
            print(context, file=sys.stderr)
            input_data['tool_response']['continue'] = False 
            input_data['tool_response']['stopReason'] = context

            sys.exit(1)
        
        # If other bonding curve files have been modified, add a warning
        elif changed_bonding_files:
            context = f"""
⚠️  BONDING CURVE FILES MODIFIED (detected at {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}):
{chr(10).join(f'  - {file}' for file in changed_bonding_files)}

IMPORTANT: Bonding curve changes can have significant economic implications:
- Ensure all mathematical formulas are correct
- Verify price calculations maintain expected behavior
- Consider impact on existing tokens and users
- Review security implications (overflow, underflow, etc.)
- Update tests to cover the changes
- Document any breaking changes

Please double-check these critical files before committing.
"""
            print(context, file=sys.stdout)
            sys.exit(0)
    
except subprocess.TimeoutExpired:
    print("Warning: Git status check timed out", file=sys.stderr)
except FileNotFoundError:
    print("Warning: Git not found or workspace directory doesn't exist", file=sys.stderr)
except Exception as e:
    print(f"Warning: Error checking bonding curve files: {e}", file=sys.stderr)

# No bonding curve files modified or error occurred - proceed normally
sys.exit(0)

