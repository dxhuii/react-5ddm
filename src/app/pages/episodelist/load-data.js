import { episodeList } from '@/store/actions/episode'

export default ({ store, match }) => {
  return new Promise(async function(resolve, reject) {
    await episodeList({ name: 'episodelist' })(store.dispatch, store.getState)

    resolve({ code: 200 })
  })
}
