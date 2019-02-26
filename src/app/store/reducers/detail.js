import merge from 'lodash/merge'

export default function() {
  let initialState = {}
  return function detail(state = initialState, action = {}) {
    const { name, data } = action
    switch (action.type) {
      case 'GET_DETAIL':
        state[name] = data
        return merge({}, state, {})
      case 'GET_SCORE':
        state[name] = data
        return merge({}, state, {})
      case 'GET_VOD_NEWS':
        state[name] = data
        return merge({}, state, {})
      case 'CLEAN':
        return {}
      default:
        return state
    }
  }
}

export const getDetail = (state, name) => {
  return state.detail[name] ? state.detail[name] : {}
}

export const getScore = (state, id) => {
  const ids = `score_${id}`
  return state.detail[ids] ? state.detail[ids] : {}
}

export const getVodNews = (state, name) => {
  const ids = `vod_news_${name}`
  return state.detail[ids] ? state.detail[ids] : {}
}
