FROM --platform=linux/amd64 node:16 as node
WORKDIR /usr/local/app
COPY ./ /usr/local/app/
RUN npm install
RUN npm run prod

FROM --platform=linux/amd64 nginx:latest
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=node /usr/local/app/dist/hospital-front /usr/share/nginx/html
EXPOSE 4200
