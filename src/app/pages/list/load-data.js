import { listLoad } from '@/store/actions/list'
import { configLoad } from '@/store/actions/config'

function isEmpty(val, type) {
  return val === undefined || val === '' || val === '-' ? (type ? 'addtime' : '') : val
}

const type = {
  tv: 201,
  ova: 202,
  juchang: 203,
  tebie: 4,
  zhenren: 204,
  qita: 35
}

export default async ({ store, match }) => {
  const { name, mcid, year, area, wd = '', order, letter, lz } = match.params
  const id = type[name] || 3
  const reduxName =
    id + isEmpty(mcid) + isEmpty(year) + isEmpty(area) + isEmpty(decodeURIComponent(wd)) + isEmpty(letter) + isEmpty(lz) + isEmpty(order, 1)
  await listLoad({
    id,
    mcid: isEmpty(mcid),
    year: isEmpty(year),
    area: isEmpty(area),
    wd: isEmpty(wd),
    letter: isEmpty(letter),
    lz: isEmpty(lz),
    order: isEmpty(order, 1)
  })(store.dispatch, store.getState)
  await configLoad({ tag: 'list' })(store.dispatch, store.getState)
  return { code: 200 }
}
