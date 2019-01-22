import loadData from '@/utils/loadData'

export function listLoad({ id, mcid, year, area, wd, letter, lz, order }) {
  return (dispatch, getState) => {
    return loadData({
      dispatch,
      getState,
      name: `${id}${mcid}${year}${area}${wd}${letter}${lz}${order}`,
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
        order,
        limit: 30
      },
      isPage: true
    })
  }
}
