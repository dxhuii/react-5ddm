// 服务端渲染依赖
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter, matchPath } from 'react-router'
import { Provider } from 'react-redux'
import MetaTagsServer from 'react-meta-tags/server'
import { MetaTagsContext } from 'react-meta-tags'
import cache from 'memory-cache'

// 创建redux store
import createStore from '@/store'
// 路由组件
import createRouter from '@/router'
// 加载初始数据
import initData from '@/init-data'

import { AUTH_COOKIE_NAME, COOKIE_PREFIX, CNZZ_STAT, BAIDU_STAT, CACHA_TIME } from 'Config'

export default (req, res) => {
  return new Promise(async (resolve, reject) => {
    const isLogin = req.cookies[`${COOKIE_PREFIX}${AUTH_COOKIE_NAME}`]
    // 如果是游客，则优先使用缓存中的数据
    if (!isLogin) {
      let _cache = cache.get(req.url)
      if (_cache) {
        try {
          resolve(JSON.parse(_cache))
          return
          // eslint-disable-next-line no-empty
        } catch (err) {}
      }
    }

    let params = {
      context: {
        code: 200
      },
      html: '',
      meta: '',
      reduxState: '{}'
    }

    // 创建新的store
    let store = createStore()

    // 准备数据，如果有token，获取用户信息并返回
    let [err, user] = await initData(store, isLogin || '')

    const router = createRouter(user)

    let route = null,
      match = null

    router.list.some(_route => {
      let _match = matchPath(req.path, _route)
      if (_match) {
        _match.search = req._parsedOriginalUrl.search || ''
        route = _route
        match = _match
      }
      return _match
    })

    if (route.enter == 'tourists' && user) {
      // 游客
      params.context = { code: 403, redirect: '/' }
      resolve(params)
      return
    } else if (route.enter == 'member' && !user) {
      // 注册会员
      params.context = { code: 403, redirect: '/' }
      resolve(params)
      return
    }

    if (route.loadData) {
      // 服务端加载数据，并返回页面的状态
      params.context = await route.loadData({ store, match, res, req, user })
    }

    // 获取路由dom
    const Router = router.dom
    const metaTagsInstance = MetaTagsServer()

    await route.component.preload()

    // html
    params.html = ReactDOMServer.renderToString(
      <Provider store={store}>
        <MetaTagsContext extract={metaTagsInstance.extract}>
          <StaticRouter location={req.url} context={params.context}>
            <Router />
          </StaticRouter>
        </MetaTagsContext>
      </Provider>
    )

    // 获取页面的meta，嵌套到模版中
    params.meta = metaTagsInstance.renderToString()

    params.CNZZ_STAT = CNZZ_STAT
    params.BAIDU_STAT = BAIDU_STAT

    // redux
    params.reduxState = JSON.stringify(store.getState()).replace(/</g, '\\x3c')

    // 释放store内存
    store = null

    // 对游客的请求进行缓存
    if (!isLogin) {
      cache.put(req.url, JSON.stringify(params), CACHA_TIME)
    }

    resolve(params)
  })
}
