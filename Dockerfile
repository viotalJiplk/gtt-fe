FROM nginx:alpine

ENV NODE_OPTIONS=--openssl-legacy-provider

RUN apk add --update --no-cache nodejs npm git

RUN mkdir /build
COPY ./ /build
WORKDIR /build
RUN cd /build
RUN npm install
RUN npm run build

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN cp -a /build/build/. /usr/share/nginx/html
WORKDIR /usr/share/nginx/html
RUN rm -rf /build

EXPOSE 80