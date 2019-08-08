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

export function playlog({ uid }) {
  return (dispatch, getState) => {
    return loadData({
      dispatch,
      getState,
      name: uid,
      reducerName: 'history',
      actionType: 'GET_PLAY_LOG',
      api: 'getplaylog',
      params: { uid },
      header: true
    })
  }
}

export function addplaylog({ id, pid, sid, name, max, uid }) {
  return () => {
    return Post({
      api: 'addplaylog',
      params: {
        uid,
        id,
        pid,
        sid,
        name,
        max
      },
      header: true
    })
  }
}

export function delplaylog({ id, uid }) {
  return () => {
    return Post({
      api: 'delplaylog',
      params: {
        id,
        uid
      },
      header: true
    })
  }
}

export function emptyhistory({ uid }) {
  return () => {
    return Post({
      api: 'emptyhistory',
      params: {
        uid
      },
      header: true
    })
  }
}
