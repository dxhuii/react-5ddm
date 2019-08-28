import React from 'react'
import Loadable from 'react-loadable'

import Head from '@/components/Head'
import Footer from '@/components/Footer'
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

const exact = true
const base = { exact, head: Head, footer: Footer }
const loading = () => <Loading />

export default [
  {
    path: '/',
    ...base,
    body: Loadable({
      loader: () => import('@/pages/home'),
      loading
    }),
    loadData: HomeLoadData,
    enter: 'everybody'
  },

  {
    path: '/week',
    ...base,
    body: Loadable({
      loader: () => import('@/pages/week'),
      loading
    }),
    loadData: WeekData,
    enter: 'everybody'
  },

  {
    path: '/week/out',
    exact,
    body: Loadable({
      loader: () => import('@/pages/week/out'),
      loading
    }),
    enter: 'everybody'
  },

  {
    path: '/week/:id',
    ...base,
    body: Loadable({
      loader: () => import('@/pages/week'),
      loading
    }),
    loadData: WeekData,
    enter: 'everybody'
  },

  {
    path: '/sign',
    exact,
    body: Loadable({
      loader: () => import('@/pages/sign'),
      loading
    }),
    enter: 'tourists'
  },

  {
    path: '/reg',
    exact,
    body: Loadable({
      loader: () => import('@/pages/reg'),
      loading
    }),
    enter: 'tourists'
  },

  {
    path: '/subject/:id',
    ...base,
    body: Loadable({
      loader: () => import('@/pages/subject'),
      loading
    }),
    loadData: SubjectLoadData,
    enter: 'everybody'
  },

  {
    path: '/subject/:id/news',
    ...base,
    body: Loadable({
      loader: () => import('@/pages/subject/news'),
      loading
    }),
    loadData: detailNewstData,
    enter: 'everybody'
  },

  {
    path: '/play/:id/:pid',
    ...base,
    body: Loadable({
      loader: () => import('@/pages/play'),
      loading
    }),
    loadData: PlayLoadData,
    enter: 'everybody'
  },

  {
    path: '/dongman',
    ...base,
    body: Loadable({
      loader: () => import('@/pages/list'),
      loading
    }),
    loadData: ListLoadData,
    enter: 'everybody'
  },

  {
    path: '/dongman/:name',
    ...base,
    body: Loadable({
      loader: () => import('@/pages/list'),
      loading
    }),
    loadData: ListLoadData,
    enter: 'everybody'
  },

  {
    path: '/type/:name/:mcid/:area/:year/:letter/:lz/:order',
    ...base,
    body: Loadable({
      loader: () => import('@/pages/list'),
      loading
    }),
    loadData: ListLoadData,
    enter: 'everybody'
  },

  {
    path: '/news',
    ...base,
    body: Loadable({
      loader: () => import('@/pages/news'),
      loading
    }),
    loadData: newsData,
    enter: 'everybody'
  },

  {
    path: '/news/:name',
    ...base,
    body: Loadable({
      loader: () => import('@/pages/news'),
      loading
    }),
    loadData: newsData,
    enter: 'everybody'
  },

  {
    path: '/article/:id',
    ...base,
    body: Loadable({
      loader: () => import('@/pages/article'),
      loading
    }),
    loadData: articleData,
    enter: 'everybody'
  },

  {
    path: '/time/:id',
    ...base,
    body: Loadable({
      loader: () => import('@/pages/time'),
      loading
    }),
    loadData: timeData,
    enter: 'everybody'
  },

  {
    path: '/search/:wd',
    ...base,
    body: Loadable({
      loader: () => import('@/pages/list'),
      loading
    }),
    loadData: ListLoadData,
    enter: 'everybody'
  },

  {
    path: '/episode/:id',
    ...base,
    body: Loadable({
      loader: () => import('@/pages/episode'),
      loading
    }),
    loadData: episodeData,
    enter: 'everybody'
  },

  {
    path: '/episode/:id/:p',
    ...base,
    body: Loadable({
      loader: () => import('@/pages/episode'),
      loading
    }),
    loadData: episodeData,
    enter: 'everybody'
  },

  {
    path: '/month/:month',
    ...base,
    body: Loadable({
      loader: () => import('@/pages/month'),
      loading
    }),
    loadData: monthData,
    enter: 'everybody'
  },

  {
    path: '/top',
    ...base,
    body: Loadable({
      loader: () => import('@/pages/top'),
      loading
    }),
    loadData: topData,
    enter: 'everybody'
  },

  {
    path: '/new',
    ...base,
    body: Loadable({
      loader: () => import('@/pages/new'),
      loading
    }),
    loadData: newData,
    enter: 'everybody'
  },

  {
    path: '/ep',
    ...base,
    body: Loadable({
      loader: () => import('@/pages/episodelist'),
      loading
    }),
    loadData: episodelistData,
    enter: 'everybody'
  },

  {
    path: '/game',
    ...base,
    body: Loadable({
      loader: () => import('../pages/game'),
      loading
    }),
    loadData: gameData,
    enter: 'everybody'
  },

  {
    path: '/game/:wd',
    ...base,
    body: Loadable({
      loader: () => import('../pages/game'),
      loading
    }),
    loadData: gameData,
    enter: 'everybody'
  },

  {
    path: '**',
    head: Head,
    footer: Footer,
    body: Loadable({
      loader: () => import('@/pages/not-found'),
      loading
    }),
    enter: 'everybody'
  }
]
