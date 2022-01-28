# syntax=docker/dockerfile:1

FROM node:16
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN mkdir config && npm install --production

COPY ./src/* ./

EXPOSE 8080

ENTRYPOINT ["node"]
CMD ["app.js"]