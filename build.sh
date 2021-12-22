#!/usr/bin/env bash
set -e

cwd=$(pwd)

echo $cwd
# 1. Build all lambdas in services

cd "common"
npm i
./build.sh
cd $cwd

for x in src/* ; do
  echo $x
  (
  for i in $x/* ; do
    (
      echo "$i"
      if test -f "$i/package.json"; then
          echo "package.json found"
          cd "$cwd/$i"
          pwd
          npm ci
      fi
    )
  done
  )
done

for x in src/* ; do
  (
    echo $i
    for i in $x/* ; do
      (
        echo "$i"
        if test -f "$i/package.json"; then
            echo "package.json found"
            cd "$cwd/$i"
            pwd
            rm -rf dist
            npm run build --if-present
            cp -R node_modules dist/node_modules
            cp package.json dist/package.json
            cd dist
            npm prune --production
            rm package.json
            rm package-lock.json
        fi
      )
    done
  )
done

cd "$cwd"
pwd

# deploy locally
# cd infra
# cdk synth --no-staging > template.yaml && sam local start-api -t template.yaml -p 3001
