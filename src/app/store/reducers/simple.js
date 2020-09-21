import cloneObj from '../clone'

const initialState = {}

export default (state = cloneObj(initialState), action = {}) => {
  const { data } = action
  switch (action.type) {
    case 'GET_SIMPLE':
      if (data) state = data
      break
    case 'UPDATE_DIGG':
      if (state.data.length > 0) {
        for (let n = 0, max = state.data.length; n < max; n++) {
          if (state.data[n].id === action.id) {
            state.data[n][action.name] += 1
          }
        }
      }
      break
    default:
      return state
  }
  return cloneObj(state)
}

export const getSimple = state => state.simple || {}
