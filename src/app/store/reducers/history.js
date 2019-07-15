import cloneObj from '../clone'

let initialState = {
  data: []
}
export default (state = cloneObj(initialState), action = {}) => {
  const { name, data } = action
  switch (action.type) {
    case 'GET_PLAY_LOG':
      if (name && data) state[name] = data
      break
    default:
      return state
  }
  return cloneObj(state)
}

export const getplaylog = (state, id) => state.history[id] || {}
