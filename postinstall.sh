#!/bin/bash

# If not running under bash/zsh, re-execute with bash
if [ -z "$BASH_VERSION" ] && [ -z "$ZSH_VERSION" ]; then
    exec bash "$0" "$@"
fi
# Create directories of not found
echo "* Prep directories ..."
mkdir -p ~/.deskdict
touch ~/.deskdict/bookmark.json

echo "✔ Bone"
