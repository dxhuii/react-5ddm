import loadData from '@/utils/loadData'

export function gameList({ order, wd, limit }) {
  return (dispatch, getState) => {
    return loadData({
      dispatch,
      getState,
      name: wd ? wd : '',
      reducerName: 'game',
      actionType: 'GET_GAME',
      api: 'game',
      params: {
        order,
        limit,
        wd
      },
      isPage: true
    })
  }
}
