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

export const getNewsIndex = (state, name, id) => {
  const ids = name === 'newslist' && id !== 44 ? id : name
  return state.newsIndex[ids] ? state.newsIndex[ids] : {}
}
