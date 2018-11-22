import merge from 'lodash/merge';

export default function getSearch(state = {}, action = {}) {
  switch (action.type) {

    case 'GET_SEARCH':
      const { q, data } = action
      state[q] = data
      return merge({}, state, {})

    default:
      return state
  }
}

export const getSearchState = (state, q) => {
  return state.search[q] ? state.search[q] : {};
}
