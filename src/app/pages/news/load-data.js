import { newsIndex } from '@/store/actions/newsIndex'
import { configLoad } from '@/store/actions/config'

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
  const id = menu[match.params.name]
  await newsIndex({ name: 'newslist', id })(store.dispatch, store.getState)
  await configLoad({ tag: 'menu' })(store.dispatch, store.getState)
  return { code: 200 }
}
