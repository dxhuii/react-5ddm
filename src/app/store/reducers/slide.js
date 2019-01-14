import merge from 'lodash/merge'

export default function slide(state = {}, action = {}) {
  const { data } = action
  switch (action.type) {
    case 'GET_SLIDE':
      state = data
      return merge({}, state, {})

    default:
      return state
  }
}

export const getSlide = state => {
  return state.slide ? state.slide : {}
}
