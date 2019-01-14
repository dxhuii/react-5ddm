import merge from 'lodash/merge'

export default function article(state = {}, action = {}) {
  switch (action.type) {
    case 'GET_NEWS_ARTICLE':
      var { name, data } = action
      state[name] = data
      return merge({}, state, {})
    default:
      return state
  }
}

export const getArticle = (state, name) => {
  return state.article[name] ? state.article[name] : {}
}
