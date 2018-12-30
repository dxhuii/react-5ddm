import merge from 'lodash/merge'

export default function top(state = {}, action = {}) {
  const { data, name } = action
  switch (action.type) {
    case 'GET_TOP':
      state[name] = data
      return merge({}, state, {})
    default:
      return state
  }
}

export const getTopList = (state, name) => {
  return state.top[name] ? state.top[name] : {}
}
