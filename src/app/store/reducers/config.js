import merge from 'lodash/merge'

export default function config(state = {}, action = {}) {
  const { name, data } = action
  switch (action.type) {
    case 'GET_CONFIG':
      state[name] = data
      return merge({}, state, {})
    default:
      return state
  }
}

export const getConfig = (state, name) => {
  return state.config[name] ? state.config[name] : {}
}
