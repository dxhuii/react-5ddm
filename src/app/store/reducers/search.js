import merge from 'lodash/merge'

export default function search(state = {}, action = {}) {
  const { data, name } = action
  switch (action.type) {
    case 'GET_SEARCH':
      state[name] = data
      return merge({}, state, {})

    default:
      return state
  }
}

export const getSearch = (state, name) => {
  return state.search[name] ? state.search[name] : {}
}
