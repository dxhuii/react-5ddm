import merge from 'lodash/merge'

export default function() {
  let initialState = {}
  return function episode(state = initialState, action = {}) {
    const { name, data } = action
    switch (action.type) {
      case 'GET_EPISCODE':
        state[name] = data
        return merge({}, state, {})
      case 'GET_EPISCODE_LIST':
        state[name] = data
        return merge({}, state, {})
      case 'CLEAN':
        return {}
      default:
        return state
    }
  }
}

export const getEpisode = (state, id, p) => {
  const ids = `${id}${p ? `-${p}` : ''}`
  return state.episode[ids] ? state.episode[ids] : {}
}

export const getEpisodeList = (state, id) => {
  return state.episode[id] ? state.episode[id] : {}
}
