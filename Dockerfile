FROM node:alpine

WORKDIR /todo-app
COPY package*.json ./
RUN npm install
COPY . ./
EXPOSE 3030

CMD ["npm", "run",  "dev"]
