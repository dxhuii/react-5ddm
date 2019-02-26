import merge from 'lodash/merge'

export default function() {
  let initialState = {}
  return function article(state = initialState, action = {}) {
    switch (action.type) {
      case 'GET_NEWS_ARTICLE':
        var { name, data } = action
        state[name] = data
        return merge({}, state, {})
      case 'CLEAN':
        return {}
      default:
        return state
    }
  }
}

export const getArticle = (state, name) => {
  return state.article[name] ? state.article[name] : {}
}
