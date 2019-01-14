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

export default [
  {
    path: '/',
    exact: true,
    head: Head,
    component: Loadable({
      loader: () => import('@/pages/home'),
      loading: () => <Loading />
    }),
    enter: 'everybody',
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
    enter: 'everybody',
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
    enter: 'member'
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
    component: Loadable({
      loader: () => import('@/pages/subject'),
      loading: () => <Loading />
    }),
    enter: 'everybody',
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
    enter: 'everybody'
  },

  {
    path: '/play/:id/:pid',
    exact: true,
    head: Head,
    component: Loadable({
      loader: () => import('@/pages/play'),
      loading: () => <Loading />
    }),
    enter: 'everybody',
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
    enter: 'everybody',
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
    enter: 'everybody',
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
    enter: 'everybody',
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
    enter: 'everybody',
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
    enter: 'everybody',
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
    enter: 'everybody',
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
    enter: 'everybody'
  },

  {
    path: '/episode/:id/',
    exact: true,
    head: Head,
    component: Loadable({
      loader: () => import('@/pages/episode'),
      loading: () => <Loading />
    }),
    enter: 'everybody',
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
    enter: 'everybody',
    loadData: episodeData
  },

  {
    path: '/upload',
    exact: true,
    head: Head,
    component: Loadable({
      loader: () => import('../pages/upload'),
      loading: () => <Loading />
    }),
    enter: 'everybody'
  },

  {
    path: '**',
    head: Head,
    component: Loadable({
      loader: () => import('@/pages/not-found'),
      loading: () => <Loading />
    }),
    enter: 'everybody'
  }
]
