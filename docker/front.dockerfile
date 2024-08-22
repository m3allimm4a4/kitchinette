FROM node:18-alpine AS base
WORKDIR /app

FROM node:18-alpine AS build
COPY . /src
WORKDIR /src
RUN npm install -g pnpm
RUN pnpm install
RUN pnpx run build

FROM build as publish
WORKDIR /publish
RUN cp -r /src/dist/kitchinette /publish

FROM base as final
COPY --from=publish /publish/* /app
ENTRYPOINT ["node","/app/server/server.mjs"]
