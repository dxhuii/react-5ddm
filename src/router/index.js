import React, { Fragment } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Loadable from 'react-loadable'

// 生成异步加载组件
import { AsyncComponent } from '../components/generate-async-component'

import Head from '../components/Head'
import Loading from '../components/Ui/Loading'

import HomeLoadData from '../pages/home/load-data'
import PlayLoadData from '../pages/play/load-data'
import SubjectLoadData from '../pages/subject/load-data'
import WeekLoadData from '../pages/week/load-data'
import ListLoadData from '../pages/list/load-data'

/**
 * 创建路由
 * @param  {Object} userinfo 用户信息，以此判断用户是否是登录状态，并控制页面访问权限
 * @return {[type]}
 */
export default user => {
  // 登录用户才能访问
  const requireAuth = (Layout, props) => {
    if (!user) {
      return <Redirect to="/sign-in" />
    } else {
      return <Layout {...props} />
    }
  }

  // 游客才能访问
  const requireTourists = (Layout, props) => {
    if (user) {
      return <Redirect to="/" />
    } else {
      return <Layout {...props} />
    }
  }

  // 大家都可以访问
  const triggerEnter = (Layout, props) => {
    return <Layout {...props} />
  }

  // 路由数组
  const routeArr = [
    {
      path: '/',
      exact: true,
      head: Head,
      // component: asyncRouteComponent({
      //   loader: () => import('../pages/home')
      // }),
      component: Loadable({
        loader: () => import('../pages/home'),
        loading: () => <Loading />
      }),
      enter: triggerEnter,
      loadData: HomeLoadData
    },

    {
      path: '/week',
      exact: true,
      head: Head,
      component: Loadable({
        loader: () => import('../pages/week'),
        loading: () => <Loading />
      }),
      enter: triggerEnter,
      loadData: WeekLoadData
    },

    {
      path: '/topics',
      exact: true,
      head: Head,
      // component: asyncRouteComponent({
      //   loader: () => import('../pages/topics')
      // }),
      component: Loadable({
        loader: () => import('../pages/topics'),
        loading: () => <Loading />
      }),
      enter: requireAuth
    },

    {
      path: '/sign-in',
      exact: true,
      // head: Head,
      // component: asyncRouteComponent({
      // loader: () => import('../pages/sign-in')
      // }),
      component: Loadable({
        loader: () => import('../pages/sign-in'),
        loading: () => <Loading />
      }),
      enter: requireTourists
    },

    {
      path: '/subject/:id',
      exact: true,
      head: Head,
      component: Loadable({
        loader: () => import('../pages/subject'),
        loading: () => <Loading />
      }),
      enter: triggerEnter,
      loadData: SubjectLoadData
    },

    {
      path: '/play/:id/:pid',
      exact: true,
      head: Head,
      component: Loadable({
        loader: () => import('../pages/play'),
        loading: () => <Loading />
      }),
      enter: triggerEnter,
      loadData: PlayLoadData
    },

    {
      path: '/list',
      exact: true,
      head: Head,
      component: Loadable({
        loader: () => import('../pages/list'),
        loading: () => <Loading />
      }),
      enter: triggerEnter,
      loadData: ListLoadData
    },

    {
      path: '/search/:wd',
      exact: true,
      head: Head,
      // component: asyncRouteComponent({
      //   loader: () => import('../pages/topics')
      // }),
      component: Loadable({
        loader: () => import('../pages/list'),
        loading: () => <Loading />
      }),
      enter: triggerEnter
    },

    {
      path: '/upload',
      exact: true,
      head: Head,
      component: Loadable({
        loader: () => import('../pages/upload'),
        loading: () => <Loading />
      }),
      enter: triggerEnter
    },

    {
      path: '**',
      head: Head,
      // component: asyncRouteComponent({
      //   loader: () => import('../pages/not-found')
      // }),
      component: Loadable({
        loader: () => import('../pages/not-found'),
        loading: () => <Loading />
      }),
      enter: triggerEnter
    }
  ]

  let router = () => (
    <Fragment>
      <Switch>
        {routeArr.map((route, index) => (
          <Route key={index} path={route.path} exact={route.exact} component={route.head} />
        ))}
      </Switch>

      <Switch>
        {routeArr.map((route, index) => {
          if (route.component) {
            return <Route key={index} path={route.path} exact={route.exact} component={props => route.enter(route.component, props)} />
          }
        })}
      </Switch>
      <AsyncComponent load={() => import('../components/Footer')}>{Component => <Component />}</AsyncComponent>
    </Fragment>
  )

  return {
    list: routeArr,
    dom: router
  }
}
