import express from 'express'
import crypto from 'crypto'
import { AUTH_COOKIE_NAME, COOKIE_PREFIX } from 'Config'

// (安全实施) 服务端储存 token cookie 设置成httpOnly
export default () => {
  const router = express.Router()

  router.post('/in', (req, res) => {
    const userinfo = req.body.userinfo
    res.cookie(`${COOKIE_PREFIX}${AUTH_COOKIE_NAME}`, userinfo, { path: '/', httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 30 })
    res.send({ success: true })
  })

  router.post('/out', (req, res) => {
    res.clearCookie(`${COOKIE_PREFIX}${AUTH_COOKIE_NAME}`)
    res.send({ success: true })
  })

  router.get('/alioss', (req, res) => {
    const zero = d => {
      return d < 9 ? '0' + d : d
    }
    const date = new Date()
    const year = date.getFullYear()
    const month = zero(date.getMonth() + 1)
    const day = zero(date.getDate())
    const dir = `test/${year}${month}${day}/`
    const aliossHost = 'https://dddmtv.oss-cn-hangzhou.aliyuncs.com'

    const time = new Date(new Date().getTime() + 30000)
    const policyObj = JSON.stringify({
      expiration: time,
      conditions: [
        // 文件大小
        ['content-length-range', 0, 1048576000],
        ['starts-with', '$key', dir]
      ]
    })
    const policy = Buffer.from(policyObj).toString('base64')
    const signature = crypto
      .createHmac('sha1', '4cbG4EyJJK7tnKVAO90vDIZjGteSG3')
      .update(policy)
      .digest()
      .toString('base64')
    res.end(
      JSON.stringify({
        accessid: 'OGZMGjw1ELEMmvec',
        host: aliossHost,
        dir,
        policy,
        expire: time,
        signature
      })
    )
  })

  return router
}
