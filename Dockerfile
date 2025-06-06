FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["sh", "-c", "npm run migration:run && npm run dev"]