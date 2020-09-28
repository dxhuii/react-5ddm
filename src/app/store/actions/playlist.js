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
      params: { id }
    })
  }
}

export function playlistType({ id, type }) {
  return (dispatch, getState) => {
    return loadData({
      dispatch,
      getState,
      name: `${type}_${id}`,
      reducerName: 'playlist',
      actionType: 'GET_PLAY_LIST_TYPE',
      api: 'playlist',
      params: { id, type }
    })
  }
}
