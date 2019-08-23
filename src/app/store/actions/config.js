import loadData from '@/utils/loadData'

export function configLoad({ tag = '' }) {
  return (dispatch, getState) => {
    return loadData({
      dispatch,
      getState,
      name: tag,
      reducerName: 'config',
      actionType: 'GET_CONFIG',
      api: 'config',
      params: { tag }
    })
  }
}
