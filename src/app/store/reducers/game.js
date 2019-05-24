import merge from 'lodash/merge'

export default function() {
  let initialState = {}
  return function game(state = initialState, action = {}) {
    const { name, data } = action
    switch (action.type) {
      case 'GET_GAME':
        name ? (state[name] = data) : (state = data)
        return merge({}, state, {})
      case 'CLEAN':
        return {}
      default:
        return state
    }
  }
}

export const getGame = (state, wd) => {
  return wd ? (state.game[wd] ? state.game[wd] : {}) : state.game ? state.game : {}
}
