import merge from 'lodash/merge'

export default function article(state = {}, action = {}) {
  const { id, data } = action
  switch (action.type) {
    case 'GET_NEWS_ARTICLE':
      state[id] = data
      return merge({}, state, {})
    default:
      return state
  }
}

export const getArticle = (state, id) => {
  return state.article[id] ? state.article[id] : {}
}
