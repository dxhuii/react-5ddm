import loadData from '@/utils/loadData'

export function article({ id }) {
  return (dispatch, getState) => {
    return loadData({
      dispatch,
      getState,
      name: id,
      reducerName: 'article',
      actionType: 'GET_NEWS_ARTICLE',
      api: 'newsDetail',
      params: { id }
    })
  }
}
