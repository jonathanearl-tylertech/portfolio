FROM node:18 as builder
WORKDIR /builder
COPY ./package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx as server
WORKDIR /app
COPY --from=builder /builder/dist /usr/share/nginx/html
