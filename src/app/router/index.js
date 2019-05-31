import React, { Fragment } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

// 生成异步加载组件
// import AsyncComponent from '@/components/AsyncComponent'

import routerList from './list'

/**
 * 创建路由
 * @param  {Object} userinfo 用户信息，以此判断用户是否是登录状态，并控制页面访问权限
 * @return {[type]}
 */
export default (user, logPageView = () => {}) => {
  // 进入路由的权限控制
  const enter = {
    // 任何人
    everybody: (Layout, props, route) => {
      logPageView()

      return <Layout {...props} />
    },
    // 游客
    tourists: (Layout, props, route) => {
      logPageView()

      if (user) {
        return <Redirect to="/" />
      } else {
        return <Layout {...props} />
      }
    },
    // 会员
    member: (Layout, props, route) => {
      logPageView()

      if (!user) {
        return <Redirect to="/" />
      } else {
        return <Layout {...props} />
      }
    }
  }

  let router = () => (
    <Fragment>
      <Switch>
        {routerList.map((route, index) => (
          <Route key={index} path={route.path} exact={route.exact} component={route.head} />
        ))}
      </Switch>
      <Switch>
        {routerList.map((route, index) => {
          if (route.component) {
            return <Route key={index} path={route.path} exact={route.exact} render={props => enter[route.enter](route.component, props, route)} />
          }
        })}
      </Switch>
      <Switch>
        {routerList.map((route, index) => (
          <Route key={index} path={route.path} exact={route.exact} component={route.footer} />
        ))}
      </Switch>
    </Fragment>
  )

  return {
    list: routerList,
    dom: router
  }
}
