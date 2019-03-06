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

import { GA, PUBLIC_PATH } from 'Config'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register(`${PUBLIC_PATH}/service-worker.js`)
      .then(registration => {
        console.log('SW registered: ', registration)
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError)
      })
  })
}

(async function() {
  // 从页面中获取服务端生产redux数据，作为客户端redux初始值
  const store = configureStore(window.__initState__)
  let userinfo = getUserInfo(store.getState())
  if (!userinfo || !userinfo.userid) userinfo = null
  let logPageView = () => {}

  if (GA) {
    ReactGA.initialize(GA)
    logPageView = userinfo => {
      let option = { page: window.location.pathname }
      if (userinfo && userinfo._id) option.userId = userinfo._id
      ReactGA.set(option)
      ReactGA.pageview(window.location.pathname)
    }
  }

  const router = createRouter(userinfo, logPageView)
  const RouterDom = router.dom

  let _route = null

  router.list.some(route => {
    let match = matchPath(window.location.pathname, route)
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
