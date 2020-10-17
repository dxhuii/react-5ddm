import loadData from '@/utils/loadData'

export function detail({ id, uid = '' }) {
  return (dispatch, getState) => {
    return loadData({
      dispatch,
      getState,
      name: id,
      reducerName: 'detail',
      actionType: 'GET_DETAIL',
      api: 'detail',
      params: { id, uid }
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
