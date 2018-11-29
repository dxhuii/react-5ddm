import merge from 'lodash/merge'

export default function top(state = {}, action = {}) {
  const { order, data, area } = action
  switch (action.type) {
    case 'GET_TOP':
      state[`${order}-${area}`] = data
      return merge({}, state, {})

    default:
      return state
  }
}

export const getTopList = (state, order, area) => {
  const id = `${order}-${area}`
  return state.top[id] ? state.top[id] : {}
}
