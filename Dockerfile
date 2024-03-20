# Stage 1: Build
FROM node:18-alpine as build-stage
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
RUN npm run build

# Stage 2: Serve app with nginx server
FROM nginx:alpine as serve-stage
COPY --from=build-stage /app/dist/* /usr/share/nginx/html/
COPY ./.docker/nginx.conf /etc/nginx/nginx.conf
COPY ./.docker/replace-env.sh /tmp
RUN chmod +x /tmp/replace-env.sh
EXPOSE 80
CMD ["/bin/sh", "-c", "/tmp/replace-env.sh /usr/share/nginx/html && nginx -g 'daemon off;'"]
