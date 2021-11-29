FROM node:12-alpine
COPY main.js .
COPY mywords.txt .
COPY flashcards-png-icon.png .
COPY views/ /views/
COPY package*.json ./
RUN npm install
EXPOSE 8080
CMD [ "node", "main.js" ]
