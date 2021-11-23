FROM node:12-alpine
COPY package.json .
COPY main.js .
COPY answer.html .
RUN npm install
EXPOSE 8080
CMD [ "node", "main.js" ]
