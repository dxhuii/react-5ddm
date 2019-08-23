import cloneObj from '../clone'

const initialState = {}

export default (state = cloneObj(initialState), action = {}) => {
  const { name, data = {} } = action
  switch (action.type) {
    case 'GET_DETAIL':
      if (name && data) state[name] = data
      break
    case 'GET_LOVE':
      if (name && data) state[name] = data
      break
    case 'GET_VOD_NEWS':
      if (name && data) state[name] = data
      break
    default:
      return state
  }
  return cloneObj(state)
}

export const getDetail = (state, name) => state.detail[name] || {}
