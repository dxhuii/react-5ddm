## 重要

- 项目 api 是第三方的，无法开源
- 前端开源，api 需自行开发

## 开发进度

- [x] 首页
- [x] 列表页
- [x] 详情页
- [x] 播放页
- [x] 评分
- [x] 收藏订阅
- [x] 登录注册
- [x] 增加 JWT 验证
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
$ git clone git@github.com:dxhuii/react-5ddm.git
$ cd react-5ddm
$ yarn
$ yarn start
```

浏览器打开 [http://localhost:4000](http://localhost:4000)

## 相关命令说明

### 开发环境

```
yarn start
```

### 生产环境测试

```
yarn pro
```

## 部署到服务器

1、打包项目

```
yarn dist
```

2、将项目上传至你的服务器  
3、启动服务

Node 启动服务

```
node ./dist/server/server.js
```

或使用 pm2 启动服务

```
pm2 start ./dist/server/server.js --name "react-5ddm" --max-memory-restart 1000M
```

## 特点

- 🖥 支持首屏服务端渲染，支持 `SEO`
- ✂️ 按页面将代码分片，然后按需加载
- 🌈 支持 `CSS Modules`，避免 `CSS` 全局污染
- ⚙️ 支持流行 UI 框架 `Bootstrap 4`
- 🔄 开发环境支持热更新
- 🎛 内置登录、退出、页面权限控制、帖子列表获取、帖子详情获取等功能
- 🚧 内置用户访问页面时，301、404 状态相应的处理逻辑

> 注：项目里面包含了对 `vscode` 的配置

## 感谢

> - 本站基于以下脚手架开发
> - ⚛️ React 同构脚手架 [https://github.com/54sword/react-starter](https://github.com/54sword/react-starter)
> - 本站衍生出的脚手架，基于以上脚手架优化而来
> - [https://github.com/dxhuii/react-ssr](https://github.com/dxhuii/react-ssr)

# 升级日志

> - [CHANGELOG.md](https://github.com/dxhuii/react-5ddm/blob/master/CHANGELOG.md)
