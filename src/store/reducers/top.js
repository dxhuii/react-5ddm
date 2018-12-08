import merge from 'lodash/merge'

export default function top(state = {}, action = {}) {
  const { data, id, order, area, limit } = action
  switch (action.type) {
    case 'GET_TOP':
      state[`${id}-${order}-${area}-${limit}`] = data
      return merge({}, state, {})

    default:
      return state
  }
}

export const getTopList = (state, id, order, area, limit) => {
  const ids = `${id}-${order}-${area}-${limit}`
  return state.top[ids] ? state.top[ids] : {}
}
