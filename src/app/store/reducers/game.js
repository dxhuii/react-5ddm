import cloneObj from '../clone'

let initialState = {}
export default (state = cloneObj(initialState), action = {}) => {
  const { name, data } = action
  switch (action.type) {
    case 'GET_GAME':
      if (name && data) name ? (state[name] = data) : (state = data)
      break
    default:
      return state
  }
  return cloneObj(state)
}

export const getGame = (state, wd) => {
  return wd ? (state.game[wd] ? state.game[wd] : {}) : state.game ? state.game : {}
}
