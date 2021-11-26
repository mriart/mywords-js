FROM node:12-alpine
COPY main.js .
COPY mywords.txt .
COPY views/ /views/
RUN npm install express@4.17.1 ejs@3.1.6
EXPOSE 8080
CMD [ "node", "main.js" ]
