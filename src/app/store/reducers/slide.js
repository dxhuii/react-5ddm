import merge from 'lodash/merge'

export default function() {
  let initialState = {}
  return function slide(state = initialState, action = {}) {
    const { data } = action
    switch (action.type) {
      case 'GET_SLIDE':
        state = data
        return merge({}, state, {})
      case 'CLEAN':
        return {}

      default:
        return state
    }
  }
}

export const getSlide = state => {
  return state.slide ? state.slide : {}
}
