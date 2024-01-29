#!/bin/bash

export NODE_ENV=development
npx sequelize-cli db:migrate --config ./src/server/config/config.json --migrations-path ./src/server/migrations

export NODE_ENV=test
npx sequelize-cli db:migrate --config ./src/server/config/config.json --migrations-path ./src/server/migrations