import loadData from '@/utils/loadData'

export function episode({ id, p }) {
  return (dispatch, getState) => {
    return loadData({
      dispatch,
      getState,
      name: `${id}${p ? `-${p}` : ''}`,
      reducerName: 'episode',
      actionType: 'GET_EPISCODE',
      api: 'storyDetail',
      params: { id, p }
    })
  }
}

export function episodeList() {
  return (dispatch, getState) => {
    return loadData({
      dispatch,
      getState,
      name: 'episodelist',
      reducerName: 'episode',
      actionType: 'GET_EPISCODE_LIST',
      api: 'storylist',
      params: { id: 902, limit: 100 },
      isPage: true
    })
  }
}
