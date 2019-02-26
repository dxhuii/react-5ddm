import merge from 'lodash/merge'

export default function() {
  let initialState = {}
  return function search(state = initialState, action = {}) {
    const { data, name } = action
    switch (action.type) {
      case 'GET_SEARCH':
        state[name] = data
        return merge({}, state, {})
      case 'CLEAN':
        return {}

      default:
        return state
    }
  }
}

export const getSearch = (state, name) => {
  return state.search[name] ? state.search[name] : {}
}
