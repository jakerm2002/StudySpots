FROM node:18

WORKDIR /frontend

COPY package-lock.json .
COPY package.json .

RUN npm install

COPY ./ /frontend

EXPOSE 3000
CMD ["npm", "start"]