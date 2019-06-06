import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'

// 配置
import { PORT } from 'Config'

import render from './render'

// 路由
import sign from './sign'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(express.static('./dist/client'))
app.use(express.static('./public'))

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

// 登录、退出
app.use('/sign', sign())

app.get('*', async function(req, res) {
  const path = req.path
  const reg = /\d+/g
  const arr = path.match(reg)
  const url = path.split('/')
  // 兼容老的URL跳转
  if ((/news/.test(path) || /article/.test(path)) && /.html/.test(path)) {
    const reUrl = `/article/${arr[0]}`
    res.status(301)
    res.redirect(reUrl)
    return
  } else if (/plot/.test(path)) {
    const reUrl = url.length === 3 ? '/ep' : `/episode/${url[2]}/${url[3]}`
    res.status(301)
    res.redirect(reUrl)
    return
  } else if (/\/ac/.test(path)) {
    const reUrl = /.html/.test(path) ? `/play/${arr[0]}/${arr[2]}` : `/subject/${arr[0]}`
    res.status(301)
    res.redirect(reUrl)
    return
  }

  let { context, html, meta, reduxState, CNZZ_STAT, BAIDU_STAT } = await render(req, res)

  res.status(context.code)

  if (context.redirect) {
    res.redirect(context.redirect)
  } else {
    res.render('../dist/server/index.ejs', { html, reduxState, meta, CNZZ_STAT, BAIDU_STAT })
  }

  res.end()
})

app.listen(PORT)
console.log('server started on port ' + PORT)
