import Post from '@/utils/post'

export function mark({ type, id, cid }) {
  return () => {
    return Post({
      api: 'mark',
      params: {
        type,
        id,
        cid
      }
    })
  }
}

export function addgold({ id, val }) {
  return () => {
    return Post({
      api: 'addgold',
      params: {
        id,
        val
      }
    })
  }
}

export function digg({ id, type, sid = 1 }) {
  return () => {
    return Post({
      api: 'digg',
      params: {
        type,
        id,
        sid
      }
    })
  }
}
