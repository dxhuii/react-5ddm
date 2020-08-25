import { newsIndex } from '@/store/actions/newsIndex'
import { configLoad } from '@/store/actions/config'
import cache from '@/utils/cache'
const { getCache, addCache } = cache

const menu = {
  zixun: 211,
  donghua: 206,
  manhua: 205,
  cast: 207,
  bagua: 208,
  jianping: 221,
  pic: 212,
  video: 222,
  yugao: 214,
  op: 215,
  bgm: 216,
  ed: 217,
  cm: 223,
  cosplay: 213,
  mad: 220,
  shengrou: 218,
  tedian: 219,
  chanye: 209
}

export default async ({ store, match }) => {
  const data = getCache('newslist')
  const id = menu[match.params.name]
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
    return { code: 200 }
  }
  const d1 = await newsIndex({ name: 'newslist', id })(store.dispatch, store.getState)
  const d2 = await configLoad({ tag: 'menu' })(store.dispatch, store.getState)
  addCache('newslist', [d1[1], d2[1]])
  return { code: 200 }
}
