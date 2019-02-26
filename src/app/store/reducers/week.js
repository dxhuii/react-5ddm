import merge from 'lodash/merge'

export default function() {
  let initialState = {}
  return function week(state = initialState, action = {}) {
    const { data } = action
    switch (action.type) {
      case 'GET_WEEK':
        state = data
        return merge({}, state, {})
      case 'CLEAN':
        return {}

      default:
        return state
    }
  }
}

export const getWeek = state => {
  return state.week ? state.week : {}
}
