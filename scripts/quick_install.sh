#!/bin/bash

echo "Acorn Quick Install"

echo "cloning Acorn"
git clone https://github.com/NathanaelLee15/Acorn.git $HOME/repos/Acorn
git pull "$HOME/repos/Acorn"

echo cloning acorn-plugins
git clone https://github.com/NathanaelLee15/acorn-plugins.git $HOME/repos/acorn-plugins
git pull "$HOME/repos/acorn-plugins"

# echo setting user env ACORN_PATH
# setx ACORN_PATH $HOME/repos/Acorn
# set ACORN_PATH=$HOME/repos/Acorn

# echo adding Acorn/bin to PATH
# echo %PATH%|findstr "Acorn" >nul || setx PATH "%PATH%;%ACORN_PATH%/bin"

# # cd to Acorn
# cd %ACORN_PATH%

# echo installing bun
# call scripts/install_bun.bat

# echo running bun install
# call bun i

# echo bootstrapping repo
# call scripts/bootstrap.bat

# code .
