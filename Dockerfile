# syntax=docker/dockerfile:1

 FROM node:14-alpine

# set working directory

#RUN apk add --no-cache python g++ make
RUN mkdir -p ...
# /usr/scr/finance_api
 #WORKDIR /app

# copy all file from current directory to docker

 #COPY . .
COPY . /usr/scr/finance_api

WORKDIR /usr/scr/finance_api

# add /usr/scr/api/node_modules/.bin to $PATH
ENV PATH /usr/scr/finance_api2/node_modules/.bin:$PATH

# install and cache app dependencies

# RUN yarn install --production
#  RUN npm install
RUN yarn

# start app
CMD ["npm", "start"]

