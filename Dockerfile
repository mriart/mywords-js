FROM node:12-alpine
COPY main.js .
COPY views/ /views/
RUN npm install express ejs
EXPOSE 8080
CMD [ "node", "main.js" ]
