import { listLoad } from '../../actions/list'

export default ({ store, match }) => {
  return new Promise(async function (resolve, reject) {

    const { id = 'list', limit = 20, order = 'addtime', day = 365  } = match.params
    await listLoad({ id, limit, order, day })(store.dispatch, store.getState)
    resolve({ code:200 });

  })
}
