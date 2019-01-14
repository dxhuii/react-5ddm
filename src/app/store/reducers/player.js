import merge from 'lodash/merge'

export default function player(state = {}, action = {}) {
  const { name, data } = action
  switch (action.type) {
    case 'GET_PLAYER':
      state[name] = data
      return merge({}, state, {})

    default:
      return state
  }
}

export const getPlayerList = (state, id, pid) => {
  const name = `${id}-${pid}`
  return state.player[name] ? state.player[name] : {}
}
