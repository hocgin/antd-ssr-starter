FROM node:12-alpine

RUN mkdir -p /usr/src/app

ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN npm i
# RUN npm i --registry=https://registry.npm.taobao.org

COPY . /usr/src/app

EXPOSE 7001
RUN npm run build

CMD npm run start
