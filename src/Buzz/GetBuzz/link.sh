#!/usr/bin/env bash
set -e

currentDir=$(pwd)

echo $currentDir

rm -rf common

if test -f "dependencies"; then
(
  # recreate local common dir
  mkdir common

  cd common
  commonArtifactsDir="../../../../common/build"
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
