import merge from 'lodash/merge'

export default function search(state = {}, action = {}) {
  const { data, wd } = action
  switch (action.type) {
    case 'GET_SEARCH':
      state[wd] = data
      return merge({}, state, {})

    default:
      return state
  }
}

export const getSearch = (state, wd) => {
  return state.search[wd] ? state.search[wd] : {}
}
