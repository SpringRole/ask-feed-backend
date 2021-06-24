FROM node:alpine
ENV PORT 3000
RUN mkdir -p /usr/app
WORKDIR /usr/src/app
COPY package*.json /usr/app/
RUN npm install
COPY . /usr/app
RUN npm run build
EXPOSE 3000
CMD ["npm" "run" "start"]