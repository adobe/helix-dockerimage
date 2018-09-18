#!/bin/sh

projects="Dockerfile"

if [ ! -z "$1" ]; then
  projects=$1
  echo $projects
fi

echo "Building $projects"

VERSION=$(cat package.json | jq -er .version)

for project in $projects; do
  if [[ "$project" == Dockerfile ]];then
    docker build -t githop -f $project . || exit 1
    docker tag githop trieloff/custom-ow-nodejs8:latest
    docker tag githop trieloff/custom-ow-nodejs8:build-$CIRCLE_BUILD_NUM
    docker tag githop trieloff/custom-ow-nodejs8:$VERSION
    docker push trieloff/custom-ow-nodejs8:latest
    docker push trieloff/custom-ow-nodejs8:build-$CIRCLE_BUILD_NUM
    docker push trieloff/custom-ow-nodejs8:$VERSION
  else
    shortname=$(echo $project | sed -e "s/\\..*//")
    docker build -t custom-ow-nodejs8:$(echo $project | sed -e "s/\\..*//") -f $project . || exit 1
    docker tag custom-ow-nodejs8:$(echo $project | sed -e "s/\\..*//") trieloff/custom-ow-nodejs8:$(echo $project | sed -e "s/\\..*//")
    docker push trieloff/custom-ow-nodejs8:$(echo $project | sed -e "s/\\..*//")
  fi
done