FROM node:18-alpine
WORKDIR /build
COPY ./package*.json ./
RUN npm ci

WORKDIR /build/prisma
COPY ./prisma ./
RUN npx prisma generate

WORKDIR /build
COPY . .
RUN npm run build
EXPOSE 80
ENV PORT=80
CMD ["node", "dist/index.js"]
