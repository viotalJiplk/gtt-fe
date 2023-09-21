FROM nginx:alpine

ENV NODE_OPTIONS=--openssl-legacy-provider

RUN apk add --update --no-cache nodejs npm git

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY ./build /usr/share/nginx/html
WORKDIR /usr/share/nginx/html
RUN rm -rf /build

EXPOSE 80