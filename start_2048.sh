#!/bin/sh

# Checking environment

if ! command -v yarn &> /dev/null
then
    echo "Yarn is not installed, please install yarn first"
    exit
fi

[[ -s $HOME/.nvm/nvm.sh ]] && . $HOME/.nvm/nvm.sh

if ! command -v nvm &> /dev/null
then
    echo "NVM is not installed, please install nvm first"
    echo "https://github.com/nvm-sh/nvm"
    exit
fi

nvm use

# Preparing frontend
cd frontend
yarn
yarn build
cp -a build/* ../backend/public
cd ../

# Preparing backend
cd backend
yarn
yarn build
open http://localhost:4000
yarn start-prod