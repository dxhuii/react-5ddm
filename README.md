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
- [ ] 每周番表
- [x] 每月新番表
- [x] 观看记录
- [x] 移动端适配
- [ ] 新闻列表
- [ ] 剧情列表
- [ ] 角色列表
- [ ] 明星列表
- [ ] 明星详情
- [ ] 角色详情
- [ ] 用户中心

## 播放条件

### copyright 接口返回

#### IS9 如果为 true 配置文件配置

- 值为 vip 时，无论有没有登录，不强制切换其他播放组
- 值为 stop 时，未登录，强制跳转到 404 页面，登录则不跳
- 值为 banquan 时，不区分是否登录，不显示播放列表，提示版权限制
- 值为 空是，无论有没有登录，不强制切换其他播放组

#### IS9 如果为 false

- 值为 vip 时，没有登录，不强制切换其他播放组，登录则强制切换其他组
- 值为 stop 时，正常播放
- 值为 banquan 时，正常播放
- 值为 空是，无论有没有登录，都强制切换其他播放组

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

# ⚛️ React 同构脚手架 [https://github.com/54sword/react-starter](https://github.com/54sword/react-starter)

Web 前端世界日新月异变化太快，为了让自己跟上节奏不掉队，总结出了自己的一套 React 脚手架，方便日后项目可以基于此快速上手开发。

## 特点

- 🖥 支持首屏服务端渲染，支持 SEO
- ✂️ 按页面将代码分片，然后按需加载
- 🌈 支持 CSS Modules，避免 CSS 全局污染
- ⚙️ 支持流行 UI 框架 Bootstrap 4
- 🔄 开发环境支持热更新
- 🎛 内置登录、退出、页面权限控制、帖子列表获取、帖子详情获取等功能
- 🚧 内置用户访问页面时，301、404 状态相应的处理逻辑

## BraftEditor 富文本编辑器调用方法

- 引入

```javascript
import { AsyncComponent } from '../../components/generate-async-component' // 生成异步加载组件
```

- 获取数据，写入 localStorage 里，默认不支持服务端渲染
- 调用

```jsx
<div styleName='editor'>
  <AsyncComponent load={() => import('../../components/Editor')}>
    {Component => <Component />}
  </AsyncComponent>
</div>
<h5>输出内容</h5>
<div className="editorbox">{outputHTML}</div>
```

## SimpleMDE 富文本编辑器调用方法

- 引入组件

```javascript
import SimpleEditor from '../../components/SimpleEditor'
```

- 获取数据

```javascript
getValue = val => {
  console.log(val, 'html')
  localStorage.commit = val
}
```

- 调用

```jsx
<SimpleEditor getValue={this.getValue} />
```

>  注：项目里面包含了对 vscode 的配置
