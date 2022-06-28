FROM node:14-alpine AS builder

WORKDIR /app

COPY package.json .

COPY . .

RUN npm install

RUN npm run build

FROM nginx:1.21.0-alpine as production

COPY --from=builder /app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d
COPY nginx/localhost.key /etc/nginx/certs/
COPY nginx/localhost.crt /etc/nginx/certs/

EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
