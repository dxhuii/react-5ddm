import cloneObj from '../clone'

const initialState = {}

export default (state = cloneObj(initialState), action = {}) => {
  const { name, data } = action
  switch (action.type) {
    case 'GET_COMMENT':
      if (name && data) state[name] = data
      break
    default:
      return state
  }
  return cloneObj(state)
}

export const getComment = (state, name) => state.comment[name] || {}
