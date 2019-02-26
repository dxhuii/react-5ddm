import merge from 'lodash/merge'

export default function() {
  let initialState = {}
  return function month(state = initialState, action = {}) {
    const { data, name } = action
    switch (action.type) {
      case 'GET_MONTH':
        state[name] = data
        return merge({}, state, {})
      case 'CLEAN':
        return {}

      default:
        return state
    }
  }
}

export const getMonth = (state, month) => {
  return state.month[month] ? state.month[month] : {}
}
