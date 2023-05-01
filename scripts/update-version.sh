#!/bin/bash

version=$(node -e 'console.log(JSON.parse(require("fs").readFileSync("./package.json", { encoding: "utf-8" })).version)')
build=$(node -e 'console.log(JSON.parse(require("fs").readFileSync("./package.json", { encoding: "utf-8" })).build)')
npx capacitor-set-version -v $version -b $build .
