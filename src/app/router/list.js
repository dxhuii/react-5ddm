import React from 'react'
import loadable from '@loadable/component'

import Head from '@/components/Head'
import Footer from '@/components/Footer'
import Loading from '@/components/Ui/Loading'

import HomeLoadData from '@/pages/home/load-data'
import SimpleData from '@/pages/simple/load-data'
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

export default [
  {
    path: '/',
    ...base,
    body: loadable(() => import('@/pages/home'), {
      fallback: <Loading />
    }),
    loadData: HomeLoadData,
    enter: 'everybody'
  },

  {
    path: '/simple',
    ...base,
    body: loadable(() => import('@/pages/simple'), {
      fallback: <Loading />
    }),
    loadData: SimpleData,
    enter: 'everybody'
  },

  {
    path: '/week',
    ...base,
    body: loadable(() => import('@/pages/week'), {
      fallback: <Loading />
    }),
    loadData: WeekData,
    enter: 'everybody'
  },

  {
    path: '/week/out',
    exact,
    body: loadable(() => import('@/pages/week/out'), {
      fallback: <Loading />
    }),
    enter: 'everybody'
  },

  {
    path: '/week/:id',
    ...base,
    body: loadable(() => import('@/pages/week'), {
      fallback: <Loading />
    }),
    loadData: WeekData,
    enter: 'everybody'
  },

  {
    path: '/sign',
    exact,
    body: loadable(() => import('@/pages/sign'), {
      fallback: <Loading />
    }),
    enter: 'tourists'
  },

  {
    path: '/reg',
    exact,
    body: loadable(() => import('@/pages/reg'), {
      fallback: <Loading />
    }),
    enter: 'tourists'
  },

  {
    path: '/subject/:id',
    ...base,
    body: loadable(() => import('@/pages/subject'), {
      fallback: <Loading />
    }),
    loadData: SubjectLoadData,
    enter: 'everybody'
  },

  {
    path: '/subject/:id/news',
    ...base,
    body: loadable(() => import('@/pages/subject/news'), {
      fallback: <Loading />
    }),
    loadData: detailNewstData,
    enter: 'everybody'
  },

  {
    path: '/dongman',
    ...base,
    body: loadable(() => import('@/pages/list'), {
      fallback: <Loading />
    }),
    loadData: ListLoadData,
    enter: 'everybody'
  },

  {
    path: '/dongman/:name',
    ...base,
    body: loadable(() => import('@/pages/list'), {
      fallback: <Loading />
    }),
    loadData: ListLoadData,
    enter: 'everybody'
  },

  {
    path: '/type/:name/:mcid/:area/:year/:letter/:lz/:order',
    ...base,
    body: loadable(() => import('@/pages/list'), {
      fallback: <Loading />
    }),
    loadData: ListLoadData,
    enter: 'everybody'
  },

  {
    path: '/news',
    ...base,
    body: loadable(() => import('@/pages/news'), {
      fallback: <Loading />
    }),
    loadData: newsData,
    enter: 'everybody'
  },

  {
    path: '/news/:name',
    ...base,
    body: loadable(() => import('@/pages/news'), {
      fallback: <Loading />
    }),
    loadData: newsData,
    enter: 'everybody'
  },

  {
    path: '/article/:id',
    ...base,
    body: loadable(() => import('@/pages/article'), {
      fallback: <Loading />
    }),
    loadData: articleData,
    enter: 'everybody'
  },

  {
    path: '/time/:id',
    ...base,
    body: loadable(() => import('@/pages/time'), {
      fallback: <Loading />
    }),
    loadData: timeData,
    enter: 'everybody'
  },

  {
    path: '/search/:wd',
    ...base,
    body: loadable(() => import('@/pages/list'), {
      fallback: <Loading />
    }),
    loadData: ListLoadData,
    enter: 'everybody'
  },

  {
    path: '/episode/:id',
    ...base,
    body: loadable(() => import('@/pages/episode'), {
      fallback: <Loading />
    }),
    loadData: episodeData,
    enter: 'everybody'
  },

  {
    path: '/episode/:id/:p',
    ...base,
    body: loadable(() => import('@/pages/episode'), {
      fallback: <Loading />
    }),
    loadData: episodeData,
    enter: 'everybody'
  },

  {
    path: '/month/:month',
    ...base,
    body: loadable(() => import('@/pages/month'), {
      fallback: <Loading />
    }),
    loadData: monthData,
    enter: 'everybody'
  },

  {
    path: '/top',
    ...base,
    body: loadable(() => import('@/pages/top'), {
      fallback: <Loading />
    }),
    loadData: topData,
    enter: 'everybody'
  },

  {
    path: '/new',
    ...base,
    body: loadable(() => import('@/pages/new'), {
      fallback: <Loading />
    }),
    loadData: newData,
    enter: 'everybody'
  },

  {
    path: '/ep',
    ...base,
    body: loadable(() => import('@/pages/episodelist'), {
      fallback: <Loading />
    }),
    loadData: episodelistData,
    enter: 'everybody'
  },

  {
    path: '/game',
    ...base,
    body: loadable(() => import('../pages/game'), {
      fallback: <Loading />
    }),
    loadData: gameData,
    enter: 'everybody'
  },

  {
    path: '/game/:wd',
    ...base,
    body: loadable(() => import('../pages/game'), {
      fallback: <Loading />
    }),
    loadData: gameData,
    enter: 'everybody'
  },

  {
    path: '**',
    head: Head,
    footer: Footer,
    body: loadable(() => import('@/pages/not-found'), {
      fallback: <Loading />
    }),
    enter: 'everybody'
  }
]
