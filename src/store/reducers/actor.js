import merge from 'lodash/merge'

export default function detailActor(state = {}, action = {}) {
  const { actor, no, data } = action
  switch (action.type) {
    case 'GET_DETAIL_ACTOR':
      state[`${actor}-${no}`] = data
      return merge({}, state, {})
    default:
      return state
  }
}

export const getDetailActor = (state, actor, no) => {
  const ids = `${actor}-${no}`
  return state.detailActor[ids] ? state.detailActor[ids] : {}
}
