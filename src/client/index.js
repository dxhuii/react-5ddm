import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { StaticRouter, matchPath } from 'react-router'
import Loadable from 'react-loadable'

import configureStore from '../store'
import createRouter from '../router'

// 引入 bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'

// 引入全局样式
import '../pages/global.scss'

// ArriveFooter 监听抵达页尾的事件
import '../utils/arrive-footer.js'

/**
 * 懒加载图片、Dom
 * 使用方式
 * 给dom添加class="load-demand"、data-load-demand="<div></div> or <img />"
 **/
import '../utils/load-demand'

// 回到顶部
import '../utils/scrollTop'

// import runtime from 'serviceworker-webpack-plugin/lib/runtime'
// if ('serviceWorker' in navigator) {
//   const registration = runtime.register();
// } else {
//   console.log("Don't support serviceWorker")
// }

// 从页面中获取服务端生产redux数据，作为客户端redux初始值
const store = configureStore(window.__initState__)

import { getUserInfo } from '../store/reducers/user'

let userinfo = getUserInfo(store.getState())

if (!userinfo || !userinfo.userid) userinfo = null

const run = async () => {
  const router = createRouter(userinfo)
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
}

run()
