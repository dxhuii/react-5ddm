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
  // 在服务端发起的请求的ua，传递给api
  if (req && req.headers && req.headers['user-agent']) {
    global.ua = req.headers['user-agent']
  }
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
