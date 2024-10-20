FROM node:18-alpine
WORKDIR /app
COPY /dist/kitchinette/ /app
EXPOSE 8080
EXPOSE 4200
ENTRYPOINT ["node","/app/server/server.mjs"]
