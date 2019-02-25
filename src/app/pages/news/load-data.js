import { newsIndex } from '@/store/actions/newsIndex'
import { configLoad } from '@/store/actions/config'
import cache from '@/utils/cache'
const { getCache, addCache } = cache

const reNewsCateId = name => {
  let id
  switch (name) {
    case 'zixun':
      id = 211
      break
    case 'donghua':
      id = 206
      break
    case 'manhua':
      id = 205
      break
    case 'cast':
      id = 207
      break
    case 'bagua':
      id = 208
      break
    case 'jianping':
      id = 221
      break
    case 'pic':
      id = 212
      break
    case 'video':
      id = 222
      break
    case 'yugao':
      id = 214
      break
    case 'op':
      id = 215
      break
    case 'bgm':
      id = 216
      break
    case 'ed':
      id = 217
      break
    case 'cm':
      id = 223
      break
    case 'cosplay':
      id = 213
      break
    case 'mad':
      id = 220
      break
    case 'shengrou':
      id = 218
      break
    case 'tedian':
      id = 219
      break
    case 'chanye':
      id = 209
      break
    default:
      id = 44
      break
  }
  return id
}

export default ({ store, match }) => {
  return new Promise(async function(resolve, reject) {
    const data = getCache('newslist')
    const id = reNewsCateId(match.params.name)
    if (data) {
      store.dispatch({
        type: 'GET_NEWS_INDEX_LIST',
        name: id !== 44 ? id : 'newslist',
        data: data[0][1]
      })
      store.dispatch({
        type: 'GET_CONFIG',
        name: 'menu',
        data: data[1][1]
      })
      resolve({ code: 200 })
      return
    }
    Promise.all([
      newsIndex({ name: 'newslist', id })(store.dispatch, store.getState),
      configLoad({ name: 'menu' })(store.dispatch, store.getState)
    ]).then(data => {
      addCache('newslist', data)
      resolve({ code: 200 })
    })
  })
}
