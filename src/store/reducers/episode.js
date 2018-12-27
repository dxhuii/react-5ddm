import merge from 'lodash/merge'

export default function episode(state = {}, action = {}) {
  const { id, p, data } = action
  switch (action.type) {
    case 'GET_EPISCODE':
      state[`${id}-${p}`] = data
      return merge({}, state, {})
    default:
      return state
  }
}

export const getEpisode = (state, id, p) => {
  const ids = `${id}-${p}`
  return state.episode[ids] ? state.episode[ids] : {}
}
