import merge from 'lodash/merge'

export default function() {
  let initialState = {}
  return function config(state = initialState, action = {}) {
    const { name, data } = action
    switch (action.type) {
      case 'GET_CONFIG':
        state[name] = data
        return merge({}, state, {})
      case 'CLEAN':
        return {}
      default:
        return state
    }
  }
}

export const getConfig = (state, name) => {
  return state.config[name] ? state.config[name] : {}
}
