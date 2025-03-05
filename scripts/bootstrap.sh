mkdir -p ./bin
if [ ! -f ./bin/acorn.sh ]; then
    copy ./scripts/acorn.sh.example ./bin/acorn.sh
fi
if [ ! -f ./bin/acorn ]; then
    copy ./scripts/acorn.sh.example ./bin/acorn
fi