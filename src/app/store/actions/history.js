import Ajax from '@/common/ajax'
import config from '@/utils/config'
import loadData from '@/utils/loadData'
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
      name: 'playlog',
      reducerName: 'history',
      actionType: 'GET_PLAY_LOG',
      api: 'getplaylog',
      params: { uid }
    })
  }
}

export const addplaylog = ({ vod_id, vod_pid, vod_sid, vod_name, url_name, vod_maxnum, uid }) => {
  return (dispatch, getState) => {
    return new Promise(async resolve => {
      let [err, data] = await Ajax({
        url: config.api.addplaylog,
        method: 'post',
        data: {
          uid,
          vod_id,
          vod_pid,
          vod_sid,
          vod_name,
          url_name,
          vod_maxnum
        }
      })
      resolve([err, data])
    })
  }
}

export const delplaylog = ({ id, uid }) => {
  return (dispatch, getState) => {
    return new Promise(async resolve => {
      let [err, data] = await Ajax({
        url: config.api.delplaylog,
        method: 'get',
        data: {
          id,
          uid
        }
      })
      resolve([err, data])
    })
  }
}

export const emptyhistory = ({ uid }) => {
  return (dispatch, getState) => {
    return new Promise(async resolve => {
      let [err, data] = await Ajax({
        url: config.api.emptyhistory,
        method: 'get',
        data: {
          uid
        }
      })
      resolve([err, data])
    })
  }
}
