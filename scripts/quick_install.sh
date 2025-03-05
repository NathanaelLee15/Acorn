#!/bin/bash

echo "Acorn Quick Install"

cwd=`pwd`

echo "setting ACORN_PATH:  $HOME/repos/Acorn"
export ACORN_PATH="$HOME/repos/Acorn"

echo "adding Acorn/bin to PATH:  $HOME/repos/Acorn/bin"
export PATH="$PATH;$HOME/repos/Acorn/bin"
echo "$PATH"

echo cloning acorn-plugins
git clone https://github.com/NathanaelLee15/acorn-plugins.git $HOME/repos/acorn-plugins
cd $HOME/repos/acorn-plugins
git pull

cd $cwd

echo "cloning Acorn"
git clone https://github.com/NathanaelLee15/Acorn.git $ACORN_PATH
cd $ACORN_PATH
git pull

echo "installing bun"
if [ -f ./scripts/install_bun.sh ]; then
    chmod +x ./scripts/install_bun.sh
    ./scripts/install_bun.sh
fi

echo "running bun install"
bun install

echo "bootstrapping repo"
if [ -f ./scripts/bootstrap.sh ]; then
    chmod +x ./scripts/bootstrap.sh
    ./scripts/bootstrap.sh
fi

code .
