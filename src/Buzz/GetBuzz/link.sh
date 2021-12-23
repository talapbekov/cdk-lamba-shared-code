#!/usr/bin/env bash
set -e

currentDir=$(pwd)

echo $currentDir

rm -rf common

commonArtifactsDir="../../../../common/build"
commonTypesDir="../../../../common/types"

if test -f "dependencies"; then
(
  # recreate local common dir
  mkdir -p common

  cd common
  # for each dependency - create symlinks
  input="../dependencies"
  while IFS= read -r dep
  do
    echo "$dep"
    echo "$commonArtifactsDir/$dep"
    ln -sf "$commonArtifactsDir/$dep/"
  done < "$input"
  )
fi

# link types anyway
cd common
ln -sf "$commonTypesDir/"
