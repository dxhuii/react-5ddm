import loadData from '@/utils/loadData'

export function recommend({ name }) {
  return (dispatch, getState) => {
    return loadData({
      dispatch,
      getState,
      name,
      reducerName: 'recommend',
      actionType: 'GET_RECOMMEND',
      api: name === 'indexRecommendAnime' ? 'list' : 'newslist',
      params: Object.assign(
        {},
        { limit: 4, order: 'hits_week', p: 0 },
        name === 'indexRecommendAnime' ? { day: 7 } : { day: 30, id: '211,206,205,207,208,209,212,213,221,222' }
      )
    })
  }
}
