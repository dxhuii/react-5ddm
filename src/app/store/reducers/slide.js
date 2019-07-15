import cloneObj from '../clone'

let initialState = {}

export default (state = cloneObj(initialState), action = {}) => {
  const { data } = action
  switch (action.type) {
    case 'GET_SLIDE':
      if (data) state = data
      break
    default:
      return state
  }
  return cloneObj(state)
}

export const getSlide = state => state.slide || {}
