#!/bin/sh

projects="Dockerfile"

if [ ! -z "$1" ]; then
  projects=$1
  echo $projects
fi

echo "Building $projects"

VERSION=$(cat package.json | jq -er .version)
BRANCH=latest
if [ -z "$CIRCLE_BRANCH" ]; then
  BRANCH=local
fi

if [ "$CIRCLE_BRANCH" != "master" ]; then
  BRANCH=$CIRCLE_BRANCH
fi

for project in $projects; do
  if [[ "$project" == Dockerfile ]];then
    docker build -t githop -f $project . || exit 1
    docker tag githop trieloff/custom-ow-nodejs8:$BRANCH
    docker tag githop trieloff/custom-ow-nodejs8:build-$CIRCLE_BUILD_NUM
    docker tag githop trieloff/custom-ow-nodejs8:$VERSION
    docker push trieloff/custom-ow-nodejs8:$BRANCH
    docker push trieloff/custom-ow-nodejs8:build-$CIRCLE_BUILD_NUM
    docker push trieloff/custom-ow-nodejs8:$VERSION
  else
    shortname=$(echo $project | sed -e "s/\\..*//")
    docker build -t $(echo $project | sed -e "s/\\..*//"):helix -f $project . || exit 1
    docker tag $(echo $project | sed -e "s/\\..*//"):helix trieloff/$(echo $project | sed -e "s/\\..*//"):helix
    docker push trieloff/$(echo $project | sed -e "s/\\..*//"):helix
  fi
done