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
      api: 'detailNews',
      params: {
        id,
        limit: 20
      },
      isPage: true
    })
  }
}

export function love({ id, sid }) {
  return (dispatch, getState) => {
    return loadData({
      dispatch,
      getState,
      name: `love_${id}`,
      reducerName: 'detail',
      actionType: 'GET_LOVE',
      api: 'love',
      params: { id, sid },
      header: true
    })
  }
}
