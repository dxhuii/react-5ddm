import merge from 'lodash/merge'

export default function() {
  let initialState = {}
  return function list(state = initialState, action = {}) {
    const { data, name } = action
    switch (action.type) {
      case 'GET_LIST':
        state[name] = data
        return merge({}, state, {})
      case 'GET_SEARCH':
        state[name] = data
        return merge({}, state, {})
      case 'GET_RECOMMEND':
        state[name] = data
        return merge({}, state, {})
      case 'GET_TOP':
        state[name] = data
        return merge({}, state, {})
      case 'GET_WEEK':
        state[name] = data
        return merge({}, state, {})
      case 'GET_DETAIL_ACTOR':
        state[name] = data
        return merge({}, state, {})
      case 'GET_ARTICLE_VOD':
        state[name] = data
        return merge({}, state, {})
      case 'GET_HOT_WEEK':
        state[name] = data
        return merge({}, state, {})
      case 'GET_TOP_LIST':
        state[name] = data
        return merge({}, state, {})
      case 'CLEAN':
        return {}

      default:
        return state
    }
  }
}

export const getList = (state, name) => {
  return state.list[name] ? state.list[name] : {}
}
