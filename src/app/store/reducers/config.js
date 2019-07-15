import cloneObj from '../clone'

let initialState = {}
export default (state = cloneObj(initialState), action = {}) => {
  const { name, data } = action
  switch (action.type) {
    case 'GET_CONFIG':
      if (name && data) state[name] = data
      break
    default:
      return state
  }
  return cloneObj(state)
}

export const getConfig = (state, name) => state.config[name] || {}
