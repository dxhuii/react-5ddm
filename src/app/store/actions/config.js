import loadData from '@/utils/loadData'

export function configLoad({ name = '' }) {
  return (dispatch, getState) => {
    return loadData({
      dispatch,
      getState,
      name: name,
      reducerName: 'config',
      actionType: 'GET_CONFIG',
      api: 'config',
      params: { name }
    })
  }
}
