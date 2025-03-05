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
sudo chmod +x ./scripts/install_bun.sh
./scripts/install_bun.sh

echo "running bun install"
sudo bun install

echo "bootstrapping repo"
sudo chmod +x ./scripts/bootstrap.sh
./scripts/bootstrap.sh

code .
