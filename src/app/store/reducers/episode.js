import merge from 'lodash/merge'

export default function episode(state = {}, action = {}) {
  const { name, data } = action
  switch (action.type) {
    case 'GET_EPISCODE':
      state[name] = data
      return merge({}, state, {})
    default:
      return state
  }
}

export const getEpisode = (state, id, p) => {
  const ids = `${id}${p ? `-${p}` : ''}`
  return state.episode[ids] ? state.episode[ids] : {}
}
