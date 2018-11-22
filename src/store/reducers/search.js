import merge from 'lodash/merge';

export default function getSearch(state = {}, action = {}) {
  switch (action.type) {

    case 'GET_SEARCH':
      const { wd, data } = action
      state[wd] = data
      return merge({}, state, {})

    default:
      return state
  }
}

export const getSearchState = (state, wd) => {
  return state.search[wd] ? state.search[wd] : {};
}
