#!/bin/zsh

set -e

yarn run test

echo "cd ~/projects/plover-tools/typey-type-lesson-generator && bat --paging never README.md"
read -q "?Have you built steno drills, fundamentals, and dictionary? (y/n) "
if [[ $REPLY =~ ^[Yy]$ ]];
  then
    echo "Great!"
  else
    echo "... No build for you!"
    exit 1
fi

# if [[ `git branch-name` != master ]];
#   then
#     echo "Not on master!"
#     exit 1
#   else
#     echo "You're on master"
# fi

ruby ~/projects/plover-tools/typey-type-lesson-generator/run-build-dict-for-typey-type-for-standard-dict-set.rb

VERSION=`git describe --abbrev=0 --tags`
# Build the production app!
REACT_APP_TYPEY_TYPE_RELEASE="$VERSION" yarn run build




# git tag -n
rsync --archive --verbose --delete --exclude=".DS_Store" -e "ssh -p 2222" ~/projects/typey-type/build/ di@localhost:www/typey-type/



say "Deployed $VERSION to staging on port 8080."
