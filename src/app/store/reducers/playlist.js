import cloneObj from '../clone'

const initialState = {}
export default (state = initialState, action = {}) => {
  const { name, data } = action
  switch (action.type) {
    case 'GET_PLAY_LIST':
      if (name && data) state[name] = data
      break
    case 'GET_PLAY_LIST_TYPE':
      if (name && data) state[name] = data
      break

    default:
      return state
  }
  return cloneObj(state)
}

export const getPlayList = (state, name) => state.playlist[name] || {}
