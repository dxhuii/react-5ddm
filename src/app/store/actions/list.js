import loadData from '@/utils/loadData'

function isEmpty(val, type) {
  return val === undefined || val === '' || val === '-' ? (type ? 'addtime' : '') : val
}

export function listLoad({ id, mcid, year, area, wd, letter, lz, order }) {
  return (dispatch, getState) => {
    return loadData({
      dispatch,
      getState,
      name: '' + id + isEmpty(mcid) + isEmpty(year) + isEmpty(area) + isEmpty(wd) + isEmpty(letter) + isEmpty(lz) + isEmpty(order, 1),
      reducerName: 'list',
      actionType: 'GET_LIST',
      api: 'listNoId',
      params: {
        id,
        mcid,
        year,
        area,
        wd,
        letter,
        lz,
        order,
        limit: 30
      },
      isPage: true
    })
  }
}

export function search({ wd }) {
  return (dispatch, getState) => {
    return loadData({
      dispatch,
      getState,
      name: wd,
      reducerName: 'list',
      actionType: 'GET_SEARCH',
      api: 'list',
      params: { wd, order: 'hits_month', p: 0 }
    })
  }
}

export function recommend({ name }) {
  return (dispatch, getState) => {
    return loadData({
      dispatch,
      getState,
      name,
      reducerName: 'list',
      actionType: 'GET_RECOMMEND',
      api: name === 'anime' ? 'list' : 'newslist',
      params: Object.assign({}, { limit: 4, order: 'hits_week', p: 0 }, name === 'anime' ? { day: 7 } : { day: 30, id: '44' })
    })
  }
}

export function top({ name }) {
  return (dispatch, getState) => {
    let api = {}
    if (name === 'topListIndexCN') {
      api = { area: '%E5%A4%A7%E9%99%86', limit: 7 }
    } else if (name === 'topListIndexJP') {
      api = { area: '%E6%97%A5%E6%9C%AC', limit: 10 }
    } else if (name === 'topListAll') {
      api = { limit: 10 }
    }
    return loadData({
      dispatch,
      getState,
      name,
      reducerName: 'list',
      actionType: 'GET_TOP',
      api: 'list',
      params: Object.assign({}, api, { order: 'hits_month', p: 0 })
    })
  }
}

export function week() {
  return (dispatch, getState) => {
    return loadData({
      dispatch,
      getState,
      name: 'week',
      reducerName: 'list',
      actionType: 'GET_WEEK',
      api: 'list',
      params: {
        react: 1,
        limit: 1000,
        p: 0
      }
    })
  }
}

export function detailActor({ actor, not }) {
  return (dispatch, getState) => {
    return loadData({
      dispatch,
      getState,
      name: `like-${not}`,
      reducerName: 'list',
      actionType: 'GET_DETAIL_ACTOR',
      api: 'list',
      params: { actor, not, p: 0 }
    })
  }
}

export function articleVod({ ids }) {
  return (dispatch, getState) => {
    return loadData({
      dispatch,
      getState,
      name: `article-${ids}`,
      reducerName: 'list',
      actionType: 'GET_ARTICLE_VOD',
      api: 'list',
      params: { ids, p: 0, limit: 1000 }
    })
  }
}

export function hotWeek({ not }) {
  return (dispatch, getState) => {
    return loadData({
      dispatch,
      getState,
      name: 'hotweek',
      reducerName: 'list',
      actionType: 'GET_HOT_WEEK',
      api: 'list',
      params: { order: 'hits_week', not, p: 0 }
    })
  }
}

export function TopList({ order }) {
  return (dispatch, getState) => {
    return loadData({
      dispatch,
      getState,
      name: `page-${order}`,
      reducerName: 'list',
      actionType: 'GET_TOP_LIST',
      api: 'list',
      params: {
        order,
        limit: 100,
        p: 0
      }
    })
  }
}
