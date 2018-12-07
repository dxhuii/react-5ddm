import express from 'express'
import { auth_cookie_name, COOKIE_PREFIX } from 'Config'

// (安全实施) 服务端储存 token cookie 设置成httpOnly
export default () => {
  const router = express.Router()

  router.post('/in', (req, res) => {
    const userinfo = req.body.userinfo
    res.cookie(`${COOKIE_PREFIX}${auth_cookie_name}`, userinfo, { path: '/', httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 30 })
    res.send({ success: true })
  })

  router.post('/out', (req, res) => {
    res.clearCookie(`${COOKIE_PREFIX}${auth_cookie_name}`)
    res.send({ success: true })
  })

  return router
}
