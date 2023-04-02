#!/bin/zsh

npm i -g ts-node nodemon typescript sass

npm i

sass src/styles/styles.scss public/styles/styles.css

nodemon src/app.ts
