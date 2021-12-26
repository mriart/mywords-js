FROM node:12-alpine
COPY main.js .
COPY mywords.txt .
COPY views/ /views/
COPY public/ /public/
COPY package*.json ./
RUN npm install
EXPOSE 8080
CMD [ "node", "main.js" ]
