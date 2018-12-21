import { article } from '@/store/actions/article'

export default ({ store, match }) => {
  return new Promise(async function(resolve, reject) {
    const { id } = match.params

    await article({ id })(store.dispatch, store.getState)

    resolve({ code: 200 })
  })
}
