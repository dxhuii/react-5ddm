import merge from 'lodash/merge'

export default function player(state = {}, action = {}) {
  const { id, data, pid } = action
  switch (action.type) {
    case 'GET_PLAYER':
      state[`${id}-${pid}`] = data
      return merge({}, state, {})

    default:
      return state
  }
}

export const getPlayerList = (state, id, pid) => {
  return state.player[`${id}-${pid}`] ? state.player[`${id}-${pid}`] : {}
}
