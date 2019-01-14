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
