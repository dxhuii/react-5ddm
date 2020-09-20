import cloneObj from '../clone'

const initialState = {}

export default (state = cloneObj(initialState), action = {}) => {
  const { data } = action
  switch (action.type) {
    case 'GET_SIMPLE':
      if (data) state = data
      break
    default:
      return state
  }
  return cloneObj(state)
}

export const getSimple = state => state.simple || {}
