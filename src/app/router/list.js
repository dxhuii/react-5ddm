import React from 'react'
import loadable from '@loadable/component'

import Head from '@/components/Head'
import Footer from '@/components/Footer'
import Loading from '@/components/Ui/Loading'

const exact = true
const base = { exact, head: Head, footer: Footer }

export default [
  {
    path: '/',
    ...base,
    body: loadable(() => import('@/pages/home'), {
      fallback: <Loading />
    }),
    enter: 'everybody'
  },

  {
    path: '/simple',
    ...base,
    body: loadable(() => import('@/pages/simple'), {
      fallback: <Loading />
    }),
    enter: 'everybody'
  },

  {
    path: '/week',
    ...base,
    body: loadable(() => import('@/pages/week'), {
      fallback: <Loading />
    }),
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
    enter: 'everybody'
  },

  {
    path: '/subject/:id/news',
    ...base,
    body: loadable(() => import('@/pages/subject/news'), {
      fallback: <Loading />
    }),
    enter: 'everybody'
  },

  {
    path: '/dongman',
    ...base,
    body: loadable(() => import('@/pages/list'), {
      fallback: <Loading />
    }),
    enter: 'everybody'
  },

  {
    path: '/dongman/:name',
    ...base,
    body: loadable(() => import('@/pages/list'), {
      fallback: <Loading />
    }),
    enter: 'everybody'
  },

  {
    path: '/type/:name/:mcid/:area/:year/:letter/:lz/:order',
    ...base,
    body: loadable(() => import('@/pages/list'), {
      fallback: <Loading />
    }),
    enter: 'everybody'
  },

  {
    path: '/news',
    ...base,
    body: loadable(() => import('@/pages/news'), {
      fallback: <Loading />
    }),
    enter: 'everybody'
  },

  {
    path: '/news/:name',
    ...base,
    body: loadable(() => import('@/pages/news'), {
      fallback: <Loading />
    }),
    enter: 'everybody'
  },

  {
    path: '/article/:id',
    ...base,
    body: loadable(() => import('@/pages/article'), {
      fallback: <Loading />
    }),
    enter: 'everybody'
  },

  {
    path: '/time/:id',
    ...base,
    body: loadable(() => import('@/pages/time'), {
      fallback: <Loading />
    }),
    enter: 'everybody'
  },

  {
    path: '/search/:wd',
    ...base,
    body: loadable(() => import('@/pages/list'), {
      fallback: <Loading />
    }),
    enter: 'everybody'
  },

  {
    path: '/episode/:id',
    ...base,
    body: loadable(() => import('@/pages/episode'), {
      fallback: <Loading />
    }),
    enter: 'everybody'
  },

  {
    path: '/episode/:id/:p',
    ...base,
    body: loadable(() => import('@/pages/episode'), {
      fallback: <Loading />
    }),
    enter: 'everybody'
  },

  {
    path: '/month/:month',
    ...base,
    body: loadable(() => import('@/pages/month'), {
      fallback: <Loading />
    }),
    enter: 'everybody'
  },

  {
    path: '/top',
    ...base,
    body: loadable(() => import('@/pages/top'), {
      fallback: <Loading />
    }),
    enter: 'everybody'
  },

  {
    path: '/new',
    ...base,
    body: loadable(() => import('@/pages/new'), {
      fallback: <Loading />
    }),
    enter: 'everybody'
  },

  {
    path: '/ep',
    ...base,
    body: loadable(() => import('@/pages/episodelist'), {
      fallback: <Loading />
    }),
    enter: 'everybody'
  },

  {
    path: '/game',
    ...base,
    body: loadable(() => import('../pages/game'), {
      fallback: <Loading />
    }),
    enter: 'everybody'
  },

  {
    path: '/game/:wd',
    ...base,
    body: loadable(() => import('../pages/game'), {
      fallback: <Loading />
    }),
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
