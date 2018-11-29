import { listLoad } from '../../store/actions/list'

export default ({ store, match }) => {
  return new Promise(async function (resolve, reject) {
    const { wd } = match.params
    await listLoad({ stateId: 'list', id: 3, wd: wd || '', day: 365, order: 'addtime', limit: 30 })(store.dispatch, store.getState)
    resolve({ code: 200 })
  })
}
