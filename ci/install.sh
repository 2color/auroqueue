#!/bin/sh

set -e
# Copy from repo to output directory for the next steps
git clone ./auroqueue-repo ./src
cd src

npm install
