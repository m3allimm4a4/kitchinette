FROM node:18-alpine AS base
WORKDIR /app

FROM node:18-alpine AS build
COPY ./api /src
WORKDIR /src
RUN npm install -g pnpm
RUN pnpm install
RUN pnpm run build

FROM build as publish
WORKDIR /publish
RUN cp -r /src/dist /publish

FROM base as final
COPY --from=publish /publish/* /app
RUN npm install -g pnpm
RUN pnpm install
EXPOSE 80
EXPOSE 443
ENTRYPOINT ["node","index.js"]
