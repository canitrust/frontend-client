FROM node:12.13-alpine as builder
# set working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH
# install and cache app dependencies
COPY package.json /usr/src/app/package.json
RUN npm install --silent
RUN npm install react-scripts -g --silent
COPY ./ /usr/src/app/
# Instruct react-app to NOT use inline script
ENV INLINE_RUNTIME_CHUNK=false
# build app
CMD npm run build
