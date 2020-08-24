/* eslint-disable no-sequences */
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cache from './cache'

// 抵御一些比较常见的安全web安全隐患
// https://cnodejs.org/topic/56f3b0e8dd3dade17726fe85
// https://github.com/helmetjs/helmet
import helmet from 'helmet'

// 配置
import { PORT, AUTH_COOKIE_NAME, COOKIE_PREFIX, CACHA_TIME } from 'Config'

import render from './render'

// 路由
import sign from './sign'

const app = express()
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(express.static('./dist/client'))
app.use(express.static('./public'))

app.use(function (req, res, next) {
  // 如果是游客，则优先使用缓存中的数据
  if (!req.cookies[`${COOKIE_PREFIX}${AUTH_COOKIE_NAME}`]) {
    const _cache = cache.get(req.originalUrl)
    if (_cache) {
      res.send(_cache)
      return
    }
  }
  next()
})

// 登录、退出
app.use('/sign', sign())

app.get('*', async function (req, res) {
  const { code, redirect, html, meta, reduxState, CNZZ_STAT, BAIDU_STAT, debug } = await render(req, res)

  res.status(code)

  if (redirect) {
    res.redirect(redirect)
  } else {
    // eslint-disable-next-line no-unused-expressions
    res.render('../dist/server/index.ejs', { html, reduxState, meta, CNZZ_STAT, BAIDU_STAT, debug }),
      function () {
        // 对游客的请求进行缓存
        if (!req.cookies[`${COOKIE_PREFIX}${AUTH_COOKIE_NAME}`]) {
          cache.set(req.originalUrl, html)
        }
        res.send(html)
      }
  }

  // res.end() /
})

app.listen(PORT)
console.log('server started on port ' + PORT)
