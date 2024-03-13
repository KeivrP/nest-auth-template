# Etapa base para el desarrollo
FROM node:20-alpine3.18 AS base

ENV DIR /app
WORKDIR $DIR
ARG YARN_TOKEN

# Etapa de desarrollo
FROM base AS dev

ENV NODE_ENV=development

COPY package*.json yarn.lock ./

# Configuración del token de autenticación de Yarn e instalación de dependencias
RUN echo "//registry.yarnpkg.com/:_authToken=$YARN_TOKEN" > ".yarnrc" && \
    yarn install --frozen-lockfile && \
    rm -f .yarnrc

COPY tsconfig*.json .
COPY .swcrc .
COPY nest-cli.json .
COPY src src

EXPOSE $PORT  
CMD ["yarn", "dev"]

# Etapa de construcción
FROM base AS build

RUN apk update && apk add --no-cache dumb-init=1.2.5-r2

COPY package*.json yarn.lock ./

RUN echo "//registry.yarnpkg.com/:_authToken=$YARN_TOKEN" > ".yarnrc" && \
    yarn add --dev \
        "@swc/core-linux-x64-gnu@1" \
        "@swc/core-linux-x64-musl@1" && \
    rm -f .yarnrc

COPY tsconfig*.json .
COPY nest-cli.json .
COPY src src

# Compilación de la aplicación y eliminación de las dependencias de desarrollo
RUN yarn build && \
    yarn install --production

# Etapa de producción
FROM base AS production

ENV NODE_ENV=production
ENV USER=node

# Copia de los archivos necesarios para la ejecución en producción
COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init
COPY --from=build $DIR/node_modules node_modules
COPY --from=build $DIR/dist dist

USER $USER
EXPOSE $PORT
CMD ["dumb-init", "node", "dist/main.js"]
