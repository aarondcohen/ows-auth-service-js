FROM node:latest
ENV INSTALL_PATH=/ows-auth-service
RUN mkdir $INSTALL_PATH
WORKDIR $INSTALL_PATH
COPY package.json yarn.lock ./
RUN yarn install
ADD . .
