import merge from 'lodash/merge'

export default function() {
  let initialState = {}
  return function ads(state = initialState, action = {}) {
    switch (action.type) {
      case 'GET_ADS':
        var { name, data } = action
        state[name] = data
        return merge({}, state, {})
      case 'CLEAN':
        return {}
      default:
        return state
    }
  }
}

export const getAds = (state, id) => {
  return state.ads[id] ? state.ads[id] : {}
}
