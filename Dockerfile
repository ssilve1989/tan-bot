FROM node:latest

COPY . /worker

WORKDIR /worker

RUN yarn 
RUN yarn build

CMD ["yarn", "start:prod"]