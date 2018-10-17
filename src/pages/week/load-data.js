import { weekLoad } from '../../actions/week';
import { topLoad } from '../../actions/top';

export default ({ store, match }) => {
  return new Promise(async function (resolve, reject) {

    await weekLoad({ id: 'weekList' })(store.dispatch, store.getState)
    await topLoad({ order: 'addtime', area: '' })(store.dispatch, store.getState)
    await topLoad({ order: 'hits_month', area: 'CN' })(store.dispatch, store.getState)
    await topLoad({ order: 'hits_month', area: 'JP' })(store.dispatch, store.getState)
    resolve({ code:200 });

  })
}
