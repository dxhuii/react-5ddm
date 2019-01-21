import React, { Fragment } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Loadable from 'react-loadable'

// 生成异步加载组件
import AsyncComponent from '@/components/AsyncComponent'

import Head from '@/components/Head'
import Loading from '@/components/Ui/Loading'

import HomeLoadData from '@/pages/home/load-data'
import PlayLoadData from '@/pages/play/load-data'
import SubjectLoadData from '@/pages/subject/load-data'
import WeekData from '@/pages/week/load-data'
import ListLoadData from '@/pages/list/load-data'
import newsData from '@/pages/news/load-data'
import articleData from '@/pages/article/load-data'
import timeData from '@/pages/time/load-data'
import episodeData from '@/pages/episode/load-data'
import monthData from '@/pages/month/load-data'

/**
 * 创建路由
 * @param  {Object} userinfo 用户信息，以此判断用户是否是登录状态，并控制页面访问权限
 * @return {[type]}
 */
export default (user, logPageView = () => {}) => {
  // 登录用户才能访问
  const requireAuth = (Layout, props) => {
    logPageView()
    if (!user) {
      return <Redirect to="/sign-in" />
    } else {
      return <Layout {...props} />
    }
  }

  // 游客才能访问
  const requireTourists = (Layout, props) => {
    logPageView()
    if (user) {
      return <Redirect to="/" />
    } else {
      return <Layout {...props} />
    }
  }

  // 大家都可以访问
  const triggerEnter = (Layout, props) => {
    logPageView()
    return <Layout {...props} />
  }

  // 路由数组
  const routeArr = [
    {
      path: '/',
      exact: true,
      head: Head,
      component: Loadable({
        loader: () => import('@/pages/home'),
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
        loader: () => import('@/pages/week'),
        loading: () => <Loading />
      }),
      enter: triggerEnter,
      loadData: WeekData
    },

    {
      path: '/topics',
      exact: true,
      head: Head,
      component: Loadable({
        loader: () => import('@/pages/topics'),
        loading: () => <Loading />
      }),
      enter: triggerEnter
    },

    {
      path: '/sign-in',
      exact: true,
      component: Loadable({
        loader: () => import('@/pages/sign-in'),
        loading: () => <Loading />
      }),
      enter: requireTourists
    },

    {
      path: '/subject/:id',
      exact: true,
      head: Head,
      component: Loadable({
        loader: () => import('@/pages/subject'),
        loading: () => <Loading />
      }),
      enter: triggerEnter,
      loadData: SubjectLoadData
    },

    {
      path: '/subject/:id/news',
      exact: true,
      head: Head,
      component: Loadable({
        loader: () => import('@/pages/subject/news'),
        loading: () => <Loading />
      }),
      enter: triggerEnter
    },

    {
      path: '/play/:id/:pid',
      exact: true,
      head: Head,
      component: Loadable({
        loader: () => import('@/pages/play'),
        loading: () => <Loading />
      }),
      enter: triggerEnter,
      loadData: PlayLoadData
    },

    {
      path: '/dongman',
      exact: true,
      head: Head,
      component: Loadable({
        loader: () => import('@/pages/list'),
        loading: () => <Loading />
      }),
      enter: triggerEnter,
      loadData: ListLoadData
    },

    {
      path: '/dongman/:name',
      exact: true,
      head: Head,
      component: Loadable({
        loader: () => import('@/pages/list'),
        loading: () => <Loading />
      }),
      enter: triggerEnter,
      loadData: ListLoadData
    },

    {
      path: '/type/:name/:mcid/:area/:year/:letter/:lz/:order',
      exact: true,
      head: Head,
      component: Loadable({
        loader: () => import('@/pages/list'),
        loading: () => <Loading />
      }),
      enter: triggerEnter,
      loadData: ListLoadData
    },

    {
      path: '/news',
      exact: true,
      head: Head,
      component: Loadable({
        loader: () => import('@/pages/news'),
        loading: () => <Loading />
      }),
      enter: triggerEnter,
      loadData: newsData
    },

    {
      path: '/article/:id',
      exact: true,
      head: Head,
      component: Loadable({
        loader: () => import('@/pages/article'),
        loading: () => <Loading />
      }),
      enter: triggerEnter,
      loadData: articleData
    },

    {
      path: '/time/:id',
      exact: true,
      head: Head,
      component: Loadable({
        loader: () => import('@/pages/time'),
        loading: () => <Loading />
      }),
      enter: triggerEnter,
      loadData: timeData
    },

    {
      path: '/search/:wd',
      exact: true,
      head: Head,
      component: Loadable({
        loader: () => import('@/pages/list'),
        loading: () => <Loading />
      }),
      enter: triggerEnter
    },

    {
      path: '/episode/:id/',
      exact: true,
      head: Head,
      component: Loadable({
        loader: () => import('@/pages/episode'),
        loading: () => <Loading />
      }),
      enter: triggerEnter,
      loadData: episodeData
    },

    {
      path: '/episode/:id/:p',
      exact: true,
      head: Head,
      component: Loadable({
        loader: () => import('@/pages/episode'),
        loading: () => <Loading />
      }),
      enter: triggerEnter,
      loadData: episodeData
    },

    {
      path: '/month/:month',
      exact: true,
      head: Head,
      component: Loadable({
        loader: () => import('@/pages/month'),
        loading: () => <Loading />
      }),
      enter: triggerEnter,
      loadData: monthData
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
      component: Loadable({
        loader: () => import('@/pages/not-found'),
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
      <AsyncComponent load={() => import('@/components/Footer')}>{Component => <Component />}</AsyncComponent>
    </Fragment>
  )

  return {
    list: routeArr,
    dom: router
  }
}
