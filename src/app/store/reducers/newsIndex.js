import merge from 'lodash/merge'

export default function newsIndex(state = {}, action = {}) {
  const { name, data } = action
  switch (action.type) {
    case 'GET_NEWS_INDEX_LIST':
      state[name] = data
      return merge({}, state, {})
    default:
      return state
  }
}

export const getNewsIndex = (state, name) => {
  return state.newsIndex[name] ? state.newsIndex[name] : {}
}
