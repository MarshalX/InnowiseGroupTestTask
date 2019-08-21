# build environment
FROM node:12.7.0-alpine as build

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

ARG API_HOST
ARG API_PORT

ENV REACT_APP_API_HOST=${API_HOST}
ENV REACT_APP_API_PORT=${API_PORT}

COPY package.json /app
RUN yarn install --frozen-lockfile

COPY public /app/public
COPY src /app/src

RUN npm run build


# production environment
FROM nginx:1.16.0-alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
COPY docker-entrypoint.sh .

CMD "nginx"