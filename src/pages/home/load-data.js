import { weekLoad } from '../../store/actions/week'
// import { topLoad } from '../../store/actions/top'
// import { listLoad } from '../../store/actions/list'

export default ({ store, match }) => {
  return new Promise(async function (resolve, reject) {

    // await listLoad({ stateId: 'weekList', id: 3, limit: 30, order: 'addtime', day: 365 })(store.dispatch, store.getState)
    await weekLoad({ id: 'weekday' })(store.dispatch, store.getState)
    // await topLoad({ order: 'addtime', area: '' })(store.dispatch, store.getState)
    // await topLoad({ order: 'hits_month', area: 'CN' })(store.dispatch, store.getState)
    // await topLoad({ order: 'hits_month', area: 'JP' })(store.dispatch, store.getState)
    resolve({ code:200 })

  })
}
