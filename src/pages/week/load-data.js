import { weekLoad } from '../../actions/week'
import { topLoad } from '../../actions/top'
// import { listLoad } from '../../actions/list'

export default ({ store, match }) => {
  return new Promise(async function (resolve, reject) {

    // const { id = 'list', limit = 20, order = 'addtime', day = 365  } = match.params
    // await listLoad({ id, limit, order, day })(store.dispatch, store.getState)
    await weekLoad({ id: 'weekList' })(store.dispatch, store.getState)
    await topLoad({ order: 'addtime', area: '' })(store.dispatch, store.getState)
    await topLoad({ order: 'hits_month', area: 'CN' })(store.dispatch, store.getState)
    await topLoad({ order: 'hits_month', area: 'JP' })(store.dispatch, store.getState)
    resolve({ code:200 });

  })
}
