import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'

// 配置
import { PORT, DOMAIN, API } from 'Config'

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

const https = require('https')

app.get('*', async function(req, res) {
  const path = req.path
  const reg = /\d+/g
  const arr = path.match(reg)
  const url = path.split('/')
  // 兼容老的URL跳转
  if (/bangumi/.test(path)) {
    const pinyin = url[2]
    // 根据拼音获取视频ID
    if (pinyin) {
      https.get(`${API}api.php?s=home-react-getVodId&pinyin=${pinyin}`, function(r) {
        r.on('data', function(d) {
          const data = JSON.parse(d || '{}')
          if (data.data) {
            const reUrl = url.length === 4 && /.html/.test(path) ? `/play/${data.data}/${arr[arr.length - 1]}` : `/subject/${data.data}`
            res.status(301)
            res.redirect(reUrl)
          } else {
            res.redirect(DOMAIN)
          }
        })
      })
      return
    }
  } else if ((/news/.test(path) || /article/.test(path)) && /.html/.test(path)) {
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

  let { context, html, meta, reduxState } = await render(req, res)

  res.status(context.code)

  if (context.redirect) {
    res.redirect(context.redirect)
  } else {
    res.render('../dist/server/index.ejs', { html, reduxState, meta })
  }

  res.end()
})

app.listen(PORT)
console.log('server started on port ' + PORT)
