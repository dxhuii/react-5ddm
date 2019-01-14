import merge from 'lodash/merge'

export default function recommend(state = {}, action = {}) {
  const { data, name } = action
  switch (action.type) {
    case 'GET_RECOMMEND':
      state[name] = data
      return merge({}, state, {})
    default:
      return state
  }
}

export const getRecommend = (state, name) => {
  return state.recommend[name] ? state.recommend[name] : {}
}
