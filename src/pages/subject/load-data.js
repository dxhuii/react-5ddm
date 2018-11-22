import { detail } from '../../store/actions/detail'
import { playlist } from '../../store/actions/playlist'

export default ({ store, match }) => {
  return new Promise(async function (resolve, reject) {

    const { id } = match.params
    await detail({id})(store.dispatch, store.getState)
    await playlist({id})(store.dispatch, store.getState)
    resolve({ code:200 });

  })
}
