FROM node:13-alpine

RUN mkdir -p /home/playFul/

WORKDIR /home/playFul/
ENV JWT_SECRETE="indeedthisisasecret"
ENV PORT=1900
ENV DATABASE_HOST='mongo'
ENV DATABASE_PORT=27017

COPY . /home/playFul/

RUN npm install 

CMD ["node","/home/playFul/src/index.js"]

# Just-kill.pro







