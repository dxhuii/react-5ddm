import { listLoad } from '../../actions/list'

export default ({ store, match }) => {
  return new Promise(async function (resolve, reject) {

    await listLoad({ stateId: 'list', id: 3, day: 365, order: 'addtime', limit: 30 })(store.dispatch, store.getState)
    resolve({ code:200 });

  })
}
