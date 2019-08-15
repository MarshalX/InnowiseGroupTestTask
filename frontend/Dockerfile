# build environment
FROM node:12.7.0-alpine as build

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app
COPY yarn.lock /app
RUN yarn install --frozen-lockfile

COPY static /app/static
COPY src /app/src

RUN npm run build


# production environment
FROM nginx:1.16.0-alpine

COPY --from=build /app/build /usr/share/nginx/html

COPY docker-entrypoint.sh .

CMD ["nginx", "-g", "daemon off;"]
