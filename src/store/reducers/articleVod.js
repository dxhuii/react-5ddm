import merge from 'lodash/merge'

export default function articleVod(state = {}, action = {}) {
  const { name, data } = action
  switch (action.type) {
    case 'GET_ARTICLE_VOD':
      state[name] = data
      return merge({}, state, {})
    default:
      return state
  }
}

export const getArticleVod = (state, name) => {
  return state.articleVod[name] ? state.articleVod[name] : {}
}
