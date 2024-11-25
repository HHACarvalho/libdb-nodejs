#!/bin/bash

# Build the docker image
docker build -t libdb-nodejs-image:latest ./

# Stop and remove any existing docker container
docker stop libdb-nodejs-container && docker rm libdb-nodejs-container

# Create and run the docker container
docker run -d -p 8080:8080 --name libdb-nodejs-container -e ENVIRONMENT=PRODUCTION libdb-nodejs-image:latest
