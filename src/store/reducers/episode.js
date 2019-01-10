import merge from 'lodash/merge'

export default function episode(state = {}, action = {}) {
  const { id, p, react, data } = action
  switch (action.type) {
    case 'GET_EPISCODE':
      state[`${id}${p ? `-${p}` : ''}${react ? `-${react}` : ''}`] = data
      return merge({}, state, {})
    default:
      return state
  }
}

export const getEpisode = (state, id, p, react) => {
  const ids = `${id}${p ? `-${p}` : ''}${react ? `-${react}` : ''}`
  return state.episode[ids] ? state.episode[ids] : {}
}
