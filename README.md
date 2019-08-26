## 开发进度

- [x] 首页
- [x] 列表页
- [x] 详情页
- [x] 播放页
- [x] 评分
- [x] 收藏订阅
- [x] 登录注册
- [x] 各种系统提示
- [x] 详情页新闻列表
- [x] 详情页剧情列表
- [x] 相关动漫
- [x] 30 天热门动漫
- [x] 30 天热门新闻
- [x] 剧情详情页
- [x] 剧情详情页剧情分集列表
- [x] 社交分享
- [x] 最新更新
- [x] 排行榜
- [x] 播放页，点赞，分享
- [x] 每周番表
- [x] 每月新番表
- [x] 观看记录
- [x] 移动端适配
- [x] 新闻列表
- [x] 剧情列表
- [ ] 角色列表
- [ ] 明星列表
- [ ] 明星详情
- [ ] 角色详情
- [ ] 用户中心

## 开始

**_没有在 windows 机器上测试过，可能会报错_**

```
$ git clone git@gitee.com:dxhuii/react-99496.git
$ cd react-99496
$ npm install
$ npm run start
```

浏览器打开 [http://localhost:4000](http://localhost:4000)

## 相关命令说明

### 开发环境

```
npm run start
```

### 生产环境测试

```
npm run pro
```

## 部署到服务器

1、打包项目

```
npm run dist
```

2、将项目上传至你的服务器  
3、启动服务

Node 启动服务

```
node ./dist/server/server.js
```

或使用 pm2 启动服务

```
pm2 start ./dist/server/server.js --name "react-99496" --max-memory-restart 400M
```

#### ⚛️ React 同构脚手架 [https://github.com/54sword/react-starter](https://github.com/54sword/react-starter)

Web 前端世界日新月异变化太快，为了让自己跟上节奏不掉队，总结出了自己的一套 React 脚手架，方便日后项目可以基于此快速上手开发。

## 特点

- 🖥 支持首屏服务端渲染，支持 SEO
- ✂️ 按页面将代码分片，然后按需加载
- 🌈 支持 CSS Modules，避免 CSS 全局污染
- ⚙️ 支持流行 UI 框架 Bootstrap 4
- 🔄 开发环境支持热更新
- 🎛 内置登录、退出、页面权限控制、帖子列表获取、帖子详情获取等功能
- 🚧 内置用户访问页面时，301、404 状态相应的处理逻辑

>  注：项目里面包含了对 vscode 的配置

# 引用

https://www.npmjs.com/package/css-loader#onlylocals 解决服务端会把 CSS 打包进 JS 的问题
