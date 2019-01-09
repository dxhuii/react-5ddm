import merge from 'lodash/merge'

export default function detail(state = {}, action = {}) {
  const { id, sid, uid, data } = action
  switch (action.type) {
    case 'GET_DETAIL':
      state[id] = data
      return merge({}, state, {})
    case 'GET_SCORE':
      state[`${id}_${sid}_${uid}`] = data
      return merge({}, state, {})
    case 'GET_VOD_NEWS':
      state[`vod_news_${id}`] = data
      return merge({}, state, {})
    default:
      return state
  }
}

export const getDetail = (state, id) => {
  return state.detail[id] ? state.detail[id] : {}
}

export const getScore = (state, id, sid, uid) => {
  const ids = `${id}_${sid}_${uid}`
  return state.detail[ids] ? state.detail[ids] : {}
}

export const getVodNews = (state, id) => {
  const ids = `vod_news_${id}`
  return state.detail[ids] ? state.detail[ids] : {}
}
