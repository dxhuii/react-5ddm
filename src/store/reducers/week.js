import merge from 'lodash/merge'

let initialState = {}

export default function week(state = initialState, action = {}) {
  const { id, data } = action
  switch (action.type) {
    case 'GET_WEEK':
      state[id] = data
      return merge({}, state, {})

    default:
      return state
  }
}

export const getWeekByListId = (state, id) => {
  return state.week[id] ? state.week[id] : {}
}
