import loadData from '@/utils/loadData'

export function listLoad({ stateId, id, mcid = '', year = '', area = '', wd = '', letter = '', lz = '', day, order, limit }) {
  return (dispatch, getState) => {
    return loadData({
      dispatch,
      getState,
      name: `${stateId}${id}${mcid}${year}${area}${wd}${letter}${lz}${day}${order}${limit}`,
      reducerName: 'list',
      actionType: 'GET_LIST',
      api: 'listNoId',
      params: {
        id,
        mcid,
        year,
        area,
        wd,
        letter,
        lz,
        day,
        order,
        limit
      },
      isPage: true
    })
  }
}
