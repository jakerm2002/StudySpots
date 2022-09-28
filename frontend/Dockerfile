FROM node:18

WORKDIR ..

COPY package-lock.json .
COPY package.json .

WORKDIR /frontend
RUN npm install

COPY . .

EXPOSE 3000
CMD ["npm", "start"]