// ArriveFooter 监听抵达页尾的事件
import './vendors/arrive-footer'
/**
 * 懒加载图片、Dom
 * 使用方式
 * 给dom添加class="load-demand"、data-load-demand="<div></div> or <img />"
 **/
import './vendors/load-demand'
import { hot, setConfig } from 'react-hot-loader'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { matchPath } from 'react-router'
import ReactGA from 'react-ga'
import { loadableReady } from '@loadable/component'

import './service-worker'

// 引入全局样式
import '../app/pages/global.scss'

import configureStore from '@/store'
import createRouter from '@/router'
import { getUserInfo } from '@/store/reducers/user'

import { GA, DOMAIN, debug } from 'Config'
setConfig({ logLevel: 'debug', reloadHooks: 'all' })

if (!debug) {
  const { origin, pathname } = window.location
  if (!/out/.test(pathname)) {
    // 打开的不是目标网站跳转到目标网站
    // if (origin !== DOMAIN) {
    //   window.location.href = DOMAIN + pathname
    // }
    // 禁止被iframe
    if (window.top !== window.self) {
      window.top.location = window.location
    }
  }
}

;(async function () {
  // 从页面中获取服务端生产redux数据，作为客户端redux初始值
  const store = configureStore(window.__initState__)
  let userinfo = getUserInfo(store.getState())
  if (!userinfo || !userinfo.userid) userinfo = {}
  let enterEvent = () => {}
  const { href, pathname } = window.location
  if (GA) {
    ReactGA.initialize(GA, { debug })
    enterEvent = userinfo => {
      const option = { page: pathname, userId: userinfo && userinfo._id ? userinfo._id : null }
      if (!debug) {
        ReactGA.set(option)
        ReactGA.pageview(pathname)
        window._hmt && window._hmt.push(['_trackPageview', pathname])
        window._czc && window._czc.push(['_trackPageview', pathname, document.referrer])
      }
    }
  }

  const router = createRouter({ user: userinfo, enterEvent })
  const Page = hot(module)(router.dom)

  let _route = null

  router.list.some(route => {
    const match = matchPath(pathname, route)
    if (match && match.path) {
      _route = route
      return true
    }
  })

  // 预先加载首屏的js（否则会出现，loading 一闪的情况）
  await _route.body.preload()
  const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate
  loadableReady(() => {
    renderMethod(
      <Provider store={store}>
        <BrowserRouter>
          <Page />
        </BrowserRouter>
      </Provider>,
      document.getElementById('app')
    )
  })

  if (debug) {
    if (module.hot) {
      module.hot.accept()
    }
  }

  // 解决在 ios safari iframe 上touchMove 滚动后，外部的点击事件会无效的问题
  document.addEventListener('touchmove', function (e) {
    e.preventDefault()
  })
})()
