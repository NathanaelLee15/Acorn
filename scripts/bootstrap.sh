mkdir -p ./bin
if [ ! -f ./bin/acorn.sh ]; then
    cp ./scripts/acorn.sh.example ./bin/acorn.sh
fi
sudo chmod +x ./bin/acorn.sh
if [ ! -f ./bin/acorn ]; then
    cp ./scripts/acorn.sh.example ./bin/acorn
fi
sudo chmod +x ./bin/acorn