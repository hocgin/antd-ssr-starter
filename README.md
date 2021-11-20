# antd-ssr-starter

> 使用 Antd + Egg + SSR 构建网站

## 如何使用

1. 安装

```sh
$ yarn
```

2.1 开发环境运行

```sh
$ npm run dev
$ open http://localhost:7001/
```

2.2 生产环境运行

```bash
$ npm run build
$ npm run start
```

## Q&A

### 如何国际化

目前是按照cookie > 浏览器默认语言 > 默认语言顺序选择   
由于服务端获取不到localStorage，所以要通过cookie将所需信息带到服务端

### 如何部署

egg内置了cluster模式，执行yarn start即可，详情见[egg官网](https://eggjs.org)  
Docker 部署可以查看 ./Dockerfile 文件
