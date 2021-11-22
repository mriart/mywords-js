FROM node:12-alpine
RUN npm install express
COPY main.js .
EXPOSE 8080
CMD [ "node", "main.js" ]