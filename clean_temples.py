#!/usr/bin/env python3
"""
Script to clean temple data - remove generic temples and keep only real ones
"""

# Read the current data.ts file
with open('temple-finder/src/data.ts', 'r') as f:
    lines = f.readlines()

# Find the line numbers for key markers
start_temple_11 = None
end_temple_400 = None

for i, line in enumerate(lines):
    if "id: '11'," in line:
        start_temple_11 = i - 2  # Include the opening brace
    if "id: '400'," in line:
        # Find the closing brace for this temple
        for j in range(i, min(i+20, len(lines))):
            if lines[j].strip() == '},':
                end_temple_400 = j + 1
                break

print(f"Found temple 11 at line {start_temple_11}")
print(f"Found end of temple 400 at line {end_temple_400}")
print(f"Will remove {end_temple_400 - start_temple_11} lines")
