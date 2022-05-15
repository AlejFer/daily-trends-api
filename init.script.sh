#!/bin/bash
if [[ ! -v NODE_ENV ]]; then
    echo "NODE_ENV is not set"
    CONFIG="development"
elif [[ -z "$NODE_ENV" ]]; then
    echo "NODE_ENV is set to the empty string"
    CONFIG="development"
else
    echo "NODE_ENV has the value: $NODE_ENV"
    CONFIG="${NODE_ENV}"
fi
echo "ENV = $CONFIG"
echo "ENV = $NODE_ENV"
cp ./environment/$CONFIG/config.json /app/dist/config/
echo "Config updated for env $CONFIG"
