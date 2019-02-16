import { newsIndex } from '@/store/actions/newsIndex'
import { configLoad } from '@/store/actions/config'

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
    await newsIndex({ name: 'newslist', id: reNewsCateId(match.params.name) })(store.dispatch, store.getState)
    await configLoad({ name: 'menu' })(store.dispatch, store.getState)

    resolve({ code: 200 })
  })
}
