FROM node:latest

RUN yarn 
RUN yarn build

CMD ["yarn", "start:prod"]