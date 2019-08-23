import cloneObj from '../clone'

let initialState = {}
export default (state = cloneObj(initialState), action = {}) => {
  const { data } = action
  switch (action.type) {
    case 'GET_GAME':
      if (data) state = data
      break
    default:
      return state
  }
  return cloneObj(state)
}

export const getGame = state => state.game || {}
