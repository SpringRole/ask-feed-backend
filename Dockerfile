FROM node:14.16 

WORKDIR /ask-feed

COPY package.json /ask-feed/package.json

RUN npm install

COPY . /ask-feed

EXPOSE 3000

CMD ["npm","start"]