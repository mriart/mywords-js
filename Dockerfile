FROM node:12-alpine
COPY main.js .
COPY mywords.txt .
COPY views/ /views/
COPY package*.json ./
COPY favicong.png .
COPY iconplus.png .
RUN npm install
EXPOSE 8080
CMD [ "node", "main.js" ]
