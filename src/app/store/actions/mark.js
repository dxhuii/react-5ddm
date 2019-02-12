import Post from '@/utils/post'

export function like({ type, id, cid, uid }) {
  return (dispatch, getState) => {
    return Post({
      api: type === 'love' ? 'love' : 'remind',
      params: {
        id,
        cid,
        uid
      }
    })
  }
}

export function mark({ id, val }) {
  return (dispatch, getState) => {
    return Post({
      api: 'mark',
      params: {
        id,
        val
      }
    })
  }
}

export function digg({ id, type, sid = 1 }) {
  return (dispatch, getState) => {
    return Post({
      api: 'digg',
      params: {
        id,
        type,
        sid
      }
    })
  }
}
