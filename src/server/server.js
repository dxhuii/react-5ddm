import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'

// 服务端渲染依赖
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter, matchPath } from 'react-router'
import { Provider } from 'react-redux'
import MetaTagsServer from 'react-meta-tags/server'
import { MetaTagsContext } from 'react-meta-tags'

// 路由配置
import configureStore from '@/store'
// 路由组件
import createRouter from '@/router'
// 路由初始化的redux内容
import { initialStateJSON } from '@/store/reducers'
import { saveAccessToken, saveUserInfo } from '@/store/actions/user'

// 配置
import { port, AUTH_COOKIE_NAME, COOKIE_PREFIX, API, DOMAIN } from 'Config'
import sign from './sign'
// import webpackHotMiddleware from './webpack-hot-middleware';

const app = express()

// ***** 注意 *****
// 不要改变如下代码执行位置，否则热更新会失效
// 开发环境开启修改代码后热更新

// if (process.env.NODE_ENV === 'development') {
// webpackHotMiddleware(app);
// }

// console.log(process.env.NODE_ENV);

// app.set("view engine","ejs");
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
// app.use(express.static('./dist'));
app.use(express.static('./dist/client'))
// app.use(express.static('./'));

// console.log(express.static(__dirname + '/dist'));

app.use(function(req, res, next) {
  // 计算页面加载完成花费的时间
  var exec_start_at = Date.now()
  var _send = res.send
  res.send = function() {
    // 发送Header
    res.set('X-Execution-Time', String(Date.now() - exec_start_at) + ' ms')
    // 调用原始处理函数
    return _send.apply(res, arguments)
  }
  next()
})

const https = require('https')

// 登录、退出
app.use('/sign', sign())

app.get('*', async (req, res) => {
  const path = req.path
  // 兼容老的URL跳转
  if (path.indexOf('bangumi') !== -1) {
    const url = path.split('/')
    const pinyin = url[2]
    // console.log(url.length, pinyin, url, path);
    // 根据拼音获取视频ID
    https.get(`${API}getVodId&pinyin=${pinyin}`, function(r) {
      // console.log('statusCode:', r.statusCode);
      // console.log('headers:', r.headers);
      r.on('data', function(d) {
        const data = JSON.parse(d)
        if (data.data) {
          const reUrl =
            url.length === 4 && path.indexOf('.html') !== -1
              ? `http:${DOMAIN}/play/${data.data}/${url[3].split('.')[0].split('-')[1]}`
              : `http:${DOMAIN}/subject/${data.data}`
          res.status(301)
          res.redirect(reUrl)
        } else {
          res.redirect(DOMAIN)
        }
      })
    })
    return
  }

  let store = configureStore(JSON.parse(initialStateJSON))

  let user = null
  let accessToken = req.cookies[`${COOKIE_PREFIX}${AUTH_COOKIE_NAME}`] || ''

  // 验证 token 是否有效
  if (accessToken) {
    // 这里可以去查询 accessToken 是否有效
    // your code
    // 这里假设如果有 accessToken ，那么就是登录用户，将他保存到redux中
    user = accessToken
    // 储存用户信息
    store.dispatch(saveUserInfo({ userinfo: user }))
    // 储存access token
    store.dispatch(saveAccessToken({ accessToken: user.auth }))
  }

  const router = createRouter(user)

  const promises = []

  let _route = null

  router.list.some(route => {
    let match = matchPath(req.path, route)

    if (match) {
      _route = route
      match.search = req._parsedOriginalUrl.search || ''
      // 需要在服务端加载的数据
      if (route.loadData) {
        promises.push(route.loadData({ store, match, res, req, user }))
      }
    }

    return match
  })

  // 路由权限控制
  switch (_route.enter) {
    // 任何人
    case 'everybody':
      break
    // 游客
    case 'tourists':
      if (user) {
        res.status(403)
        return res.redirect('/')
      }
      break
    // 注册会员
    case 'member':
      if (!user) {
        res.status(403)
        return res.redirect('/sign-in')
      }
      break
  }

  let context = {
    code: 200
    // url
  }

  // 获取路由dom
  const _Router = router.dom
  const metaTagsInstance = MetaTagsServer()

  // await Loadable.preloadAll();
  await _route.component.preload()

  if (promises.length > 0) {
    await Promise.all(promises).then(value => {
      if (value && value[0]) context = value[0]
    })
  }

  let _mainContent = (
    <Provider store={store}>
      <MetaTagsContext extract={metaTagsInstance.extract}>
        <StaticRouter location={req.url} context={context}>
          <_Router />
        </StaticRouter>
      </MetaTagsContext>
    </Provider>
  )

  // html
  let html = ReactDOMServer.renderToString(_mainContent)

  // 获取页面的meta，嵌套到模版中
  let meta = metaTagsInstance.renderToString()

  let reduxState = JSON.stringify(store.getState()).replace(/</g, '\\x3c')

  if (context.code == 302) {
    res.writeHead(302, {
      Location: context.url
    })
  } else {
    res.status(context.code)
    res.render('../dist/server/index.ejs', { html, reduxState, meta })
  }

  res.end()

  // 释放store内存
  store = null
})

app.listen(port)
console.log('server started on port ' + port)
