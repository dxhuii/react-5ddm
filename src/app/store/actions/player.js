import loadData from '@/utils/loadData'

export function playerLoad({ id, pid }) {
  return (dispatch, getState) => {
    return loadData({
      dispatch,
      getState,
      name: `${id}-${pid}`,
      reducerName: 'player',
      actionType: 'GET_PLAYER',
      api: 'player',
      params: { id, pid }
    })
  }
}
