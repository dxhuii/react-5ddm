import merge from 'lodash/merge'

export default function list(state = {}, action = {}) {
  switch (action.type) {

    case 'GET_LIST':
      const { id, data } = action
      state[id] = data
      return merge({}, state, {})

    default:
      return state
  }
}

export const getList = (state, id) => {
  return state.list[id] ? state.list[id] : {}
}
