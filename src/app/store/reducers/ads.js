import merge from 'lodash/merge'

export default function ads(state = {}, action = {}) {
  switch (action.type) {
    case 'GET_ADS':
      var { name, data } = action
      state[name] = data
      return merge({}, state, {})
    default:
      return state
  }
}

export const getAds = (state, id) => {
  return state.ads[id] ? state.ads[id] : {}
}
