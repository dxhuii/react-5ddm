import merge from 'lodash/merge'

export default function() {
  let initialState = {}
  return function player(state = initialState, action = {}) {
    const { name, data } = action
    switch (action.type) {
      case 'GET_PLAYER':
        state[name] = data
        return merge({}, state, {})
      case 'CLEAN':
        return {}

      default:
        return state
    }
  }
}

export const getPlayerList = (state, id, pid) => {
  const name = `${id}-${pid}`
  return state.player[name] ? state.player[name] : {}
}
