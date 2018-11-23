## 开始

***没有在windows机器上测试过，可能会报错***

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
Web前端世界日新月异变化太快，为了让自己跟上节奏不掉队，总结出了自己的一套React脚手架，方便日后项目可以基于此快速上手开发。


## 特点
 + 🖥 支持首屏服务端渲染，支持SEO
 + ✂️ 按页面将代码分片，然后按需加载
 + 🌈 支持 CSS Modules，避免CSS全局污染
 + ⚙️ 支持流行UI框架 Bootstrap 4
 + 🔄 开发环境支持热更新
 + 🎛 内置登录、退出、页面权限控制、帖子列表获取、帖子详情获取等功能
 + 🚧 内置用户访问页面时，301、404 状态相应的处理逻辑  


## BraftEditor富文本编辑器调用方法
- 引入
```javascript
import { AsyncComponent } from '../../components/generate-async-component' // 生成异步加载组件
```
- 获取数据，写入localStorage里，默认不支持服务端渲染
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
getValue = (val) => {
  console.log(val, 'html')
  localStorage.commit = val
}
```
- 调用
```jsx
<SimpleEditor getValue={this.getValue} />
```
