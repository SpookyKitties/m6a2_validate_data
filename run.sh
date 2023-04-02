#!/bin/zsh

npm i

sass src/styles/styles.scss public/styles/styles.css

nodemon src/app.ts
