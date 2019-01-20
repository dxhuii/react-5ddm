import merge from 'lodash/merge'

export default function detailActor(state = {}, action = {}) {
  const { data, name } = action
  switch (action.type) {
    case 'GET_DETAIL_ACTOR':
      state[name] = data
      return merge({}, state, {})
    default:
      return state
  }
}

export const getDetailActor = (state, no) => {
  return state.detailActor[no] ? state.detailActor[no] : {}
}
