import React from 'react'
import Loadable from 'react-loadable'

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
import topData from '@/pages/top/load-data'
import newData from '@/pages/new/load-data'
import episodelistData from '@/pages/episodelist/load-data'
import detailNewstData from '@/pages/subject/news/load-data'
import gameData from '@/pages/game/load-data'
import Footer from '@/components/Footer'

export default [
  {
    path: '/',
    exact: true,
    head: Head,
    footer: Footer,
    component: Loadable({
      loader: () => import('@/pages/home'),
      loading: () => <Loading />
    }),
    loadData: HomeLoadData,
    enter: 'everybody'
  },

  {
    path: '/week',
    exact: true,
    head: Head,
    footer: Footer,
    component: Loadable({
      loader: () => import('@/pages/week'),
      loading: () => <Loading />
    }),
    loadData: WeekData,
    enter: 'everybody'
  },

  {
    path: '/week/out',
    exact: true,
    component: Loadable({
      loader: () => import('@/pages/week/out'),
      loading: () => <Loading />
    }),
    enter: 'everybody'
  },

  {
    path: '/week/:id',
    exact: true,
    head: Head,
    footer: Footer,
    component: Loadable({
      loader: () => import('@/pages/week'),
      loading: () => <Loading />
    }),
    loadData: WeekData,
    enter: 'everybody'
  },

  {
    path: '/sign-in',
    exact: true,
    component: Loadable({
      loader: () => import('@/pages/sign-in'),
      loading: () => <Loading />
    }),
    enter: 'tourists'
  },

  {
    path: '/subject/:id',
    exact: true,
    head: Head,
    footer: Footer,
    component: Loadable({
      loader: () => import('@/pages/subject'),
      loading: () => <Loading />
    }),
    loadData: SubjectLoadData,
    enter: 'everybody'
  },

  {
    path: '/subject/:id/news',
    exact: true,
    head: Head,
    footer: Footer,
    component: Loadable({
      loader: () => import('@/pages/subject/news'),
      loading: () => <Loading />
    }),
    loadData: detailNewstData,
    enter: 'everybody'
  },

  {
    path: '/play/:id/:pid',
    exact: true,
    head: Head,
    footer: Footer,
    component: Loadable({
      loader: () => import('@/pages/play'),
      loading: () => <Loading />
    }),
    loadData: PlayLoadData,
    enter: 'everybody'
  },

  {
    path: '/dongman',
    exact: true,
    head: Head,
    footer: Footer,
    component: Loadable({
      loader: () => import('@/pages/list'),
      loading: () => <Loading />
    }),
    loadData: ListLoadData,
    enter: 'everybody'
  },

  {
    path: '/dongman/:name',
    exact: true,
    head: Head,
    footer: Footer,
    component: Loadable({
      loader: () => import('@/pages/list'),
      loading: () => <Loading />
    }),
    loadData: ListLoadData,
    enter: 'everybody'
  },

  {
    path: '/type/:name/:mcid/:area/:year/:letter/:lz/:order',
    exact: true,
    head: Head,
    footer: Footer,
    component: Loadable({
      loader: () => import('@/pages/list'),
      loading: () => <Loading />
    }),
    loadData: ListLoadData,
    enter: 'everybody'
  },

  {
    path: '/news',
    exact: true,
    head: Head,
    footer: Footer,
    component: Loadable({
      loader: () => import('@/pages/news'),
      loading: () => <Loading />
    }),
    loadData: newsData,
    enter: 'everybody'
  },

  {
    path: '/news/:name',
    exact: true,
    head: Head,
    footer: Footer,
    component: Loadable({
      loader: () => import('@/pages/news'),
      loading: () => <Loading />
    }),
    loadData: newsData,
    enter: 'everybody'
  },

  {
    path: '/article/:id',
    exact: true,
    head: Head,
    footer: Footer,
    component: Loadable({
      loader: () => import('@/pages/article'),
      loading: () => <Loading />
    }),
    loadData: articleData,
    enter: 'everybody'
  },

  {
    path: '/time/:id',
    exact: true,
    head: Head,
    footer: Footer,
    component: Loadable({
      loader: () => import('@/pages/time'),
      loading: () => <Loading />
    }),
    loadData: timeData,
    enter: 'everybody'
  },

  {
    path: '/search/:wd',
    exact: true,
    head: Head,
    footer: Footer,
    component: Loadable({
      loader: () => import('@/pages/list'),
      loading: () => <Loading />
    }),
    enter: 'everybody'
  },

  {
    path: '/episode/:id',
    exact: true,
    head: Head,
    footer: Footer,
    component: Loadable({
      loader: () => import('@/pages/episode'),
      loading: () => <Loading />
    }),
    loadData: episodeData,
    enter: 'everybody'
  },

  {
    path: '/episode/:id/:p',
    exact: true,
    head: Head,
    footer: Footer,
    component: Loadable({
      loader: () => import('@/pages/episode'),
      loading: () => <Loading />
    }),
    loadData: episodeData,
    enter: 'everybody'
  },

  {
    path: '/month/:month',
    exact: true,
    head: Head,
    footer: Footer,
    component: Loadable({
      loader: () => import('@/pages/month'),
      loading: () => <Loading />
    }),
    loadData: monthData,
    enter: 'everybody'
  },

  {
    path: '/top',
    exact: true,
    component: Loadable({
      loader: () => import('@/pages/top'),
      loading: () => <Loading />
    }),
    loadData: topData,
    enter: 'everybody'
  },

  {
    path: '/new',
    exact: true,
    head: Head,
    footer: Footer,
    component: Loadable({
      loader: () => import('@/pages/new'),
      loading: () => <Loading />
    }),
    loadData: newData,
    enter: 'everybody'
  },

  {
    path: '/ep',
    exact: true,
    head: Head,
    footer: Footer,
    component: Loadable({
      loader: () => import('@/pages/episodelist'),
      loading: () => <Loading />
    }),
    loadData: episodelistData,
    enter: 'everybody'
  },

  // {
  //   path: '/upload',
  //   exact: true,
  //   head: Head,
  //   footer: Footer,
  //   component: Loadable({
  //     loader: () => import('../pages/upload'),
  //     loading: () => <Loading />
  //   }),
  //   enter: 'everybody'
  // },

  {
    path: '/out/pic',
    exact: true,
    component: Loadable({
      loader: () => import('../pages/out/pic'),
      loading: () => <Loading />
    }),
    enter: 'everybody'
  },

  {
    path: '/game',
    exact: true,
    head: Head,
    footer: Footer,
    component: Loadable({
      loader: () => import('../pages/game'),
      loading: () => <Loading />
    }),
    loadData: gameData,
    enter: 'everybody'
  },

  {
    path: '/game/:wd',
    exact: true,
    head: Head,
    footer: Footer,
    component: Loadable({
      loader: () => import('../pages/game'),
      loading: () => <Loading />
    }),
    loadData: gameData,
    enter: 'everybody'
  },

  {
    path: '**',
    head: Head,
    footer: Footer,
    component: Loadable({
      loader: () => import('@/pages/not-found'),
      loading: () => <Loading />
    }),
    enter: 'everybody'
  }
]
