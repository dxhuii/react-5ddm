import loadData from '@/utils/loadData'

export function TopList({ order }) {
  return (dispatch, getState) => {
    return loadData({
      dispatch,
      getState,
      name: order,
      reducerName: 'page',
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
