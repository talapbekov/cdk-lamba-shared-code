#!/usr/bin/env bash
set -e

commonDir=$(pwd)

echo $commonDir

npm i


# generate typedefs
npx tsc --declaration --emitDeclarationOnly

# build common
npm run build

# merge typedefs to build
cp -r dist/lib/. "$commonDir/build"

rm -rf dist
