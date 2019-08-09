import Post from '@/utils/post'

export function mark({ type, id, cid }) {
  return () => {
    return Post({
      api: type === 'love' ? 'love' : 'remind',
      params: {
        type,
        id,
        cid
      },
      header: true
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
