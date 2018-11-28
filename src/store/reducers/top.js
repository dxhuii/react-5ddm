import merge from 'lodash/merge'

export default function top(state = {}, action = {}) {
  switch (action.type) {
    case 'GET_TOP':
      const { order, data, area } = action
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
