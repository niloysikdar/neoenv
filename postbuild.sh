#!/bin/sh

# Exit immediately if a command exits with a non-zero status.
set -e

# Add type commonjs to the package.json file in the dist/cjs folder
cat >dist/cjs/package.json <<!EOF
{
    "type": "commonjs"
}
!EOF

# Add type module to the package.json file in the dist/esm folder
cat >dist/esm/package.json <<!EOF
{
    "type": "module"
}
!EOF

# Adding shebang to the top of the file
sed -i '1i #!/usr/bin/env node' dist/cjs/generate.js

# Removing the generate.js and generate.d.ts files from the dist/esm folder
rm -rf dist/esm/generate.js dist/esm/generate.d.ts

echo "Fixup done."