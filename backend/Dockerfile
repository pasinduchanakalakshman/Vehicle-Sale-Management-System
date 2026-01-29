# use base image with Node.js
FROM node:24.13.0-alpine3.23

# set working directory
WORKDIR /app

# copy package.json and package-lock.json
COPY package*.json .

#Install dependencies
RUN npm install

# copy the rest of the application code
COPY . .

# expose the port the app runs on
EXPOSE  5000

# start the application
CMD [ "npm", "run", "dev" ]

