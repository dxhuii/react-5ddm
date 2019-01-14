import loadData from '@/utils/loadData'

export function articleVod({ ids }) {
  return (dispatch, getState) => {
    return loadData({
      dispatch,
      getState,
      name: ids,
      reducerName: 'articleVod',
      actionType: 'GET_ARTICLE_VOD',
      api: 'list',
      params: { ids, p: 0 }
    })
  }
}
