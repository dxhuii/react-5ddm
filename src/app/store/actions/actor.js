import loadData from '@/utils/loadData'

export function detailActor({ actor, no }) {
  return (dispatch, getState) => {
    return loadData({
      dispatch,
      getState,
      name: no,
      reducerName: 'detailActor',
      actionType: 'GET_DETAIL_ACTOR',
      api: 'list',
      params: { actor, no, p: 0 }
    })
  }
}
