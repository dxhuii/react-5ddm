import loadData from '@/utils/loadData'
import Post from '@/utils/post'

export function comment({ id, sid }) {
  return (dispatch, getState) => {
    return loadData({
      dispatch,
      getState,
      name: `${sid}_${id}`,
      reducerName: 'comment',
      actionType: 'GET_COMMENT',
      api: 'comment',
      params: { id, sid }
    })
  }
}

export function addComment({ id, sid = 1, content, nickname, pid }) {
  return () => {
    return Post({
      api: 'addComment',
      params: {
        id,
        sid,
        comm_txt: content,
        user_nickname: nickname,
        comm_pid: pid
      }
    })
  }
}
