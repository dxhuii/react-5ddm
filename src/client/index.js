import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { StaticRouter, matchPath } from 'react-router'
import ReactGA from 'react-ga'

// 引入全局样式
import '../pages/global.scss'

import configureStore from '@/store'
import createRouter from '@/router'
import { GA, analysis_script } from 'Config'

// ArriveFooter 监听抵达页尾的事件
import '@/utils/arrive-footer.js'

/**
 * 懒加载图片、Dom
 * 使用方式
 * 给dom添加class="load-demand"、data-load-demand="<div></div> or <img />"
 **/
import '@/utils/load-demand'

import { getUserInfo } from '@/store/reducers/user'
debugger

// import runtime from 'serviceworker-webpack-plugin/lib/runtime'
// if ('serviceWorker' in navigator) {
//   const registration = runtime.register();
// } else {
//   console.log("Don't support serviceWorker")
// }

// 从页面中获取服务端生产redux数据，作为客户端redux初始值
const store = configureStore(window.__initState__)

let userinfo = getUserInfo(store.getState())

let logPageView = () => {}

if (GA) {
  ReactGA.initialize(GA)
  logPageView = userinfo => {
    let option = { page: window.location.pathname }
    if (userinfo && userinfo.userid) option.userId = userinfo.userid
    ReactGA.set(option)
    ReactGA.pageview(window.location.pathname)
  }
}

const run = async () => {
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
  // if (_route && _route.component && _route.component.preload && _route.loadData) {
  await _route.component.preload()
  // }

  ReactDOM.hydrate(
    <Provider store={store}>
      <BrowserRouter>{RouterDom()}</BrowserRouter>
    </Provider>,
    document.getElementById('app')
  )

  if (process.env.NODE_ENV === 'development') {
    if (module.hot) {
      module.hot.accept()
    }
  }

  // 添加页面第三方统计分析脚本
  // document.body.append(`<div style="display:none">${analysis_script}</div>`)

  // 解决在 ios safari iframe 上touchMove 滚动后，外部的点击事件会无效的问题
  document.addEventListener('touchmove', function(e) {
    e.preventDefault()
  })
}

run()
