import cloneObj from '../clone'

let initialState = {}
export default (state = initialState, action = {}) => {
  const { name, data } = action
  switch (action.type) {
    case 'GET_PLAY_LIST':
      if (name && data) state[name] = data
      break

    default:
      return state
  }
  return cloneObj(state)
}

export const getPlayList = (state, name) => state.playlist[name] || {}
