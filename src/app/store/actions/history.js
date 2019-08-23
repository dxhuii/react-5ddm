import loadData from '@/utils/loadData'
import Post from '@/utils/post'

/**
 * 用户访问页面的记录
 * @param {String} page url地址
 */
export const addVisitHistory = page => {
  return dispatch => {
    dispatch({ type: 'ADD_HISTORY', page })
  }
}

export function playlog() {
  return (dispatch, getState) => {
    return loadData({
      dispatch,
      getState,
      reducerName: 'history',
      actionType: 'GET_PLAY_LOG',
      api: 'getplaylog',
      header: true
    })
  }
}

export function addplaylog({ id, pid, sid, name, max }) {
  return () => {
    return Post({
      api: 'addplaylog',
      params: {
        id,
        pid,
        sid,
        name,
        max
      }
    })
  }
}

export function delplaylog({ id }) {
  return () => {
    return Post({
      api: 'delplaylog',
      params: {
        id
      }
    })
  }
}

export function emptyhistory() {
  return () => {
    return Post({
      api: 'emptyhistory'
    })
  }
}
