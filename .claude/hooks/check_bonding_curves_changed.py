#!/usr/bin/env python3
import json
import sys
import subprocess
import os
import datetime

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
    'ressources/fandomchain_bonding_curve_spec.md',
]

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
        
        for line in modified_files:
            if line.strip():
                # Parse git status output (format: "XY filename")
                status = line[:2]
                filename = line[3:].strip()
                
                # Check if any bonding curve file is modified
                for monitored_file in bonding_curve_files:
                    if monitored_file in filename:
                        changed_bonding_files.append(filename)
        
        # If bonding curve files have been modified, add a warning context
        if changed_bonding_files:
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
            print(context)
            sys.exit(0)
    
except subprocess.TimeoutExpired:
    print("Warning: Git status check timed out", file=sys.stderr)
except FileNotFoundError:
    print("Warning: Git not found or workspace directory doesn't exist", file=sys.stderr)
except Exception as e:
    print(f"Warning: Error checking bonding curve files: {e}", file=sys.stderr)

# No bonding curve files modified or error occurred - proceed normally
sys.exit(0)

