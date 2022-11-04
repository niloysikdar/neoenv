#!/bin/sh

# Exit immediately if a command exits with a non-zero status.
set -e

# Adding shebang to the top of the file
sed -i '1i #!/usr/bin/env node' dist/cjs/generate.js

# Removing the generate.d.ts and templates.d.ts files from the dist/types folder
rm -rf dist/types/generate.d.ts dist/types/templates.d.ts

echo "Fixup done."