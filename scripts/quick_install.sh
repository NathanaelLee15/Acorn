#!/bin/bash

echo "Acorn Quick Install"

echo "cloning Acorn"
git clone https://github.com/NathanaelLee15/Acorn.git $HOME/repos/Acorn
git pull "$HOME/repos/Acorn"

echo cloning acorn-plugins
git clone https://github.com/NathanaelLee15/acorn-plugins.git $HOME/repos/acorn-plugins
git pull "$HOME/repos/acorn-plugins"

echo "setting ACORN_PATH:  $HOME/repos/Acorn"
export ACORN_PATH="$HOME/repos/Acorn"

echo "adding Acorn/bin to PATH:  $HOME/repos/Acorn/bin"
export PATH="$PATH;$HOME/repos/Acorn/bin"

# # cd to Acorn
# cd %ACORN_PATH%

# echo installing bun
# call scripts/install_bun.sh

# echo running bun install
# call bun i

# echo bootstrapping repo
# call scripts/bootstrap.sh

# code .
