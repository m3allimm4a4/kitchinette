FROM node:18-alpine AS base
WORKDIR /app

FROM node:18-alpine AS build
WORKDIR /src
COPY . .
RUN npm install -g pnpm
RUN pnpm install
RUN pnpm run build

FROM build as publish
WORKDIR /publish
RUN cp -r /src/dist/kitchinette /publish

FROM base as final
COPY --from=publish /publish/* /app
EXPOSE 80
EXPOSE 4200
ENTRYPOINT ["node","/app/server/server.mjs"]
