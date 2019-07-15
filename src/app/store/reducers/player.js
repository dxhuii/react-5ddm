import cloneObj from '../clone'

let initialState = {}
export default (state = cloneObj(initialState), action = {}) => {
  const { name, data } = action
  switch (action.type) {
    case 'GET_PLAYER':
      if (name && data) state[name] = data
      break

    default:
      return state
  }
  return cloneObj(state)
}

export const getPlayerList = (state, id, pid) => state.player[`${id}-${pid}`] || {}
