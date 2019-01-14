import merge from 'lodash/merge'

export default function week(state = {}, action = {}) {
  const { data } = action
  switch (action.type) {
    case 'GET_WEEK':
      state = data
      return merge({}, state, {})

    default:
      return state
  }
}

export const getWeek = state => {
  return state.week ? state.week : {}
}
