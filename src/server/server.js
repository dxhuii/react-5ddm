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
