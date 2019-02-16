import loadData from '@/utils/loadData'

export function detail({ id }) {
  return (dispatch, getState) => {
    return loadData({
      dispatch,
      getState,
      name: id,
      reducerName: 'detail',
      actionType: 'GET_DETAIL',
      api: 'detail',
      params: { id }
    })
  }
}

export function vodNews({ id }) {
  return (dispatch, getState) => {
    return loadData({
      dispatch,
      getState,
      name: `vod_news_${id}`,
      reducerName: 'detail',
      actionType: 'GET_VOD_NEWS',
      api: 'newslist',
      params: {
        did: id,
        limit: 20,
        id: 44
      },
      isPage: true
    })
  }
}

export function score({ id, sid, uid }) {
  return (dispatch, getState) => {
    return loadData({
      dispatch,
      getState,
      name: `score_${id}`,
      reducerName: 'detail',
      actionType: 'GET_SCORE',
      api: 'score',
      params: { id, sid, uid }
    })
  }
}
