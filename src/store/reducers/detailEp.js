import merge from 'lodash/merge'

export default function detailEp(state = {}, action = {}) {
  const { id, data } = action
  switch (action.type) {
    case 'GET_DETAIL_EP':
      state[id] = data
      return merge({}, state, {})
    default:
      return state
  }
}

export const getDetailEp = (state, id) => {
  return state.detailEp[id] ? state.detailEp[id] : {}
}
