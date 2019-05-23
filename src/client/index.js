import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { matchPath } from 'react-router'
import ReactGA from 'react-ga'

// 引入全局样式
import '../app/pages/global.scss'

import configureStore from '@/store'
import createRouter from '@/router'
import { getUserInfo } from '@/store/reducers/user'

import { CNZZ_STAT, BAIDU_STAT, GA, ISAD, DOMAIN } from 'Config'
import { loadScript } from '@/utils'

import * as OfflinePluginRuntime from 'offline-plugin/runtime'
if (process.env.NODE_ENV !== 'development') {
  OfflinePluginRuntime.install()
  OfflinePluginRuntime.applyUpdate()
  const { origin, pathname } = window.location
  if (!/out/.test(pathname)) {
    // 打开的不是目标网站跳转到目标网站
    if (origin !== DOMAIN) {
      window.location.href = DOMAIN + pathname
    }
    // 禁止被iframe
    if (window.top !== window.self) {
      window.top.location = window.location
    }
  }
}

(async function() {
  // 从页面中获取服务端生产redux数据，作为客户端redux初始值
  const store = configureStore(window.__initState__)
  let userinfo = getUserInfo(store.getState())
  if (!userinfo || !userinfo.userid) userinfo = null
  let logPageView = () => {}
  const { href, pathname } = window.location
  if (GA) {
    ReactGA.initialize(GA)
    logPageView = userinfo => {
      let option = { page: pathname }
      if (userinfo && userinfo._id) option.userId = userinfo._id
      if (process.env.NODE_ENV !== 'development') {
        if (href.indexOf('/play/') !== -1) {
          devtoolsDetector.addListener(function(isOpen, detail) {
            if (isOpen) {
              top.location.href = DOMAIN
            }
          })
          devtoolsDetector.lanuch()
        }
        ReactGA.set(option)
        ReactGA.pageview(pathname)
        const cnzz = `https://s13.cnzz.com/z_stat.php?id=${CNZZ_STAT}&web_id=${CNZZ_STAT}`
        const bd = `https://hm.baidu.com/hm.js?${BAIDU_STAT}`
        const push = 'https://zz.bdstatic.com/linksubmit/push.js'
        loadScript(push)
        loadScript(bd)
        loadScript(cnzz)
        if (ISAD && pathname !== '/') {
          loadScript('//cos.mdb6.com/static/income.min.js', true, function() {
            // 全站底漂
            if (income[5]) {
              const { content } = income[5]
              loadScript(content, true)
            }
            // 右侧小图标
            if (income[9]) {
              const { content } = income[9]
              loadScript(content, true)
            }
          })
        }
      }
    }
  }

  const router = createRouter(userinfo, logPageView)
  const RouterDom = router.dom

  let _route = null

  router.list.some(route => {
    let match = matchPath(pathname, route)
    if (match && match.path) {
      _route = route
      return true
    }
  })

  // 预先加载首屏的js（否则会出现，loading 一闪的情况）
  await _route.component.preload()

  ReactDOM.hydrate(
    <Provider store={store}>
      <BrowserRouter>
        <RouterDom />
      </BrowserRouter>
    </Provider>,
    document.getElementById('app')
  )

  if (process.env.NODE_ENV === 'development') {
    if (module.hot) {
      module.hot.accept()
    }
  }

  // 解决在 ios safari iframe 上touchMove 滚动后，外部的点击事件会无效的问题
  document.addEventListener('touchmove', function(e) {
    e.preventDefault()
  })
})()
