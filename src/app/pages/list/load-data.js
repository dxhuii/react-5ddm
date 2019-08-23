import { listLoad } from '@/store/actions/list'
import { configLoad } from '@/store/actions/config'
import cache from '@/utils/cache'
const { getCache, addCache } = cache

function getTypeId(name) {
  let id
  switch (name) {
    case 'tv':
      id = 201
      break
    case 'ova':
      id = 202
      break
    case 'juchang':
      id = 203
      break
    case 'tebie':
      id = 4
      break
    case 'zhenren':
      id = 204
      break
    case 'qita':
      id = 35
      break
    default:
      id = 3
      break
  }
  return id
}

function isEmpty(val, type) {
  return val === undefined || val === '' || val === '-' ? (type ? 'addtime' : '') : val
}

export default ({ store, match }) => {
  return new Promise(async function(resolve, reject) {
    const { name, mcid, year, area, wd = '', order, letter, lz } = match.params
    const id = getTypeId(name)
    const reduxName = id + isEmpty(mcid) + isEmpty(year) + isEmpty(area) + isEmpty(wd) + isEmpty(letter) + isEmpty(lz) + isEmpty(order, 1)
    const data = getCache('list')
    if (data) {
      store.dispatch({
        type: 'GET_LIST',
        name: reduxName,
        data: data[0][1]
      })
      store.dispatch({
        type: 'GET_CONFIG',
        name: 'list',
        data: data[1][1]
      })
      resolve({ code: 200 })
      return
    }
    Promise.all([
      listLoad({
        id,
        mcid: isEmpty(mcid),
        year: isEmpty(year),
        area: isEmpty(area),
        wd: isEmpty(wd),
        letter: isEmpty(letter),
        lz: isEmpty(lz),
        order: isEmpty(order, 1)
      })(store.dispatch, store.getState),
      configLoad({ tag: 'list' })(store.dispatch, store.getState)
    ]).then(data => {
      addCache('list', data)
      resolve({ code: 200 })
    })
  })
}
