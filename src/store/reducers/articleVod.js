import merge from 'lodash/merge'

export default function articleVod(state = {}, action = {}) {
  const { ids, data } = action
  switch (action.type) {
    case 'GET_ARTICLE_VOD':
      state[ids] = data
      return merge({}, state, {})
    default:
      return state
  }
}

export const getArticleVod = (state, ids) => {
  return state.articleVod[ids] ? state.articleVod[ids] : {}
}
