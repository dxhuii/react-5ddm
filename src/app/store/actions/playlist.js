import loadData from '@/utils/loadData'

export function playlist({ id }) {
  return (dispatch, getState) => {
    return loadData({
      dispatch,
      getState,
      name: id,
      reducerName: 'playlist',
      actionType: 'GET_PLAY_LIST',
      api: 'playlist',
      params: { id, react: 1 }
    })
  }
}
