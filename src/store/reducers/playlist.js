import merge from 'lodash/merge'

export default function playlist(state = {}, action = {}) {
  const { name, data } = action
  switch (action.type) {
    case 'GET_PLAY_LIST':
      state[name] = data
      return merge({}, state, {})

    default:
      return state
  }
}

export const getPlayList = (state, name) => {
  return state.playlist[name] ? state.playlist[name] : {}
}
