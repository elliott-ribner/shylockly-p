FROM node:alpine AS builder

#
# Needed for bcrypt node module.
#
RUN apk add --virtual builds-deps build-base python

WORKDIR /app

COPY .npmrc /root/.npmrc
COPY package.json .

RUN npm install
RUN rm -rf ~/.npmrc

COPY . .

RUN npm run build
RUN ls -la
#
#ENTRYPOINT [ "node", "/app/dist/main.js" ]

CMD ["node", "/app/dist/main.js"]
