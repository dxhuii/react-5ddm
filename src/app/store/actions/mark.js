import storage from '@/common/storage'
import Toast from '@/components/Toast'
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
      },
      header: false
    })
  }
}

export function digg({ id, type, sid = 1, info = 'list' }) {
  return async (dispatch, getState) => {
    let digg = storage.load('digg') || ''
    digg = digg.split(',')
    if (digg.indexOf(String(id)) === -1) {
      digg.push(id)
      storage.save('digg', digg.join(','))
      dispatch({ type: info === 'list' ? 'UPDATE_DIGG' : 'UPDATE_SUBJECT_DIGG', id, name: type })
      return Post({
        api: 'digg',
        params: {
          type,
          id,
          sid
        },
        header: false
      })
    } else {
      Toast.info(`您已经${type === 'up' ? '顶' : '踩'}过了`)
      return ['', { code: 0 }]
    }
  }
}
