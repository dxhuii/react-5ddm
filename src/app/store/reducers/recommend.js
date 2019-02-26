import merge from 'lodash/merge'

export default function() {
  let initialState = {}
  return function recommend(state = initialState, action = {}) {
    const { data, name } = action
    switch (action.type) {
      case 'GET_RECOMMEND':
        state[name] = data
        return merge({}, state, {})
      case 'CLEAN':
        return {}
      default:
        return state
    }
  }
}

export const getRecommend = (state, name) => {
  return state.recommend[name] ? state.recommend[name] : {}
}
