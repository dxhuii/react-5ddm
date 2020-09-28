import cloneObj from '../clone'

const initialState = {}
export default (state = cloneObj(initialState), action = {}) => {
  const { name, data } = action
  switch (action.type) {
    case 'GET_EPISCODE':
      if (name && data) state[name] = data
      break
    case 'GET_EPISCODE_LIST':
      if (name && data) state[name] = data
      break
    default:
      return state
  }
  return cloneObj(state)
}

export const getEpisodeList = (state, id) => state.episode[id] || {}
