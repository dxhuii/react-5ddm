// 服务端渲染依赖
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter, matchPath } from 'react-router'
import { Provider } from 'react-redux'
import MetaTagsServer from 'react-meta-tags/server'
import { MetaTagsContext } from 'react-meta-tags'

// 创建redux store
import createStore from '@/store'
// 路由组件
import createRouter from '@/router'
// 加载初始数据
import initData from '@/init-data'

import { COOKIE_PREFIX, AUTH_COOKIE_NAME, CNZZ_STAT, BAIDU_STAT, debug } from 'Config'

export default (req, res) => {
  return new Promise(async (resolve, reject) => {
    let params = {
      code: 200,
      redirect: '',
      html: '',
      meta: '',
      reduxState: '{}',
      user: null
    }

    // 创建新的store
    let store = createStore()

    // 准备数据，如果有token，获取用户信息并返回
    let [err, user] = await initData(store, req.cookies[`${COOKIE_PREFIX}${AUTH_COOKIE_NAME}`] || '')

    params.user = user

    let router = createRouter({ user })

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
      params.code = 403
      params.redirect = '/'
      resolve(params)
      return
    } else if (route.enter == 'member' && !user) {
      // 注册会员
      params.code = 403
      params.redirect = '/'
      resolve(params)
      return
    }

    if (route.loadData) {
      // 服务端加载数据，并返回页面的状态
      let { code, redirect } = await route.loadData({ store, match, res, req, user })
      params.code = code
      params.redirect = redirect
    }

    // 获取路由dom
    const Page = router.dom

    await route.body.preload()

    const metaTagsInstance = MetaTagsServer()

    // html
    params.html = ReactDOMServer.renderToString(
      <Provider store={store}>
        <MetaTagsContext extract={metaTagsInstance.extract}>
          <StaticRouter location={req.url}>
            <Page />
          </StaticRouter>
        </MetaTagsContext>
      </Provider>
    )

    // 获取页面的meta，嵌套到模版中
    params.meta = metaTagsInstance.renderToString()

    params.CNZZ_STAT = CNZZ_STAT
    params.BAIDU_STAT = BAIDU_STAT
    params.debug = debug

    // redux
    params.reduxState = JSON.stringify(store.getState()).replace(/</g, '\\x3c')

    // 释放store内存
    store = null
    router = null

    resolve(params)
  })
}
