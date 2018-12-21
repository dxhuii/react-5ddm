import merge from 'lodash/merge'

export default function news(state = {}, action = {}) {
  const { id, news, did, name, wd, letter, day, order, limit, data } = action
  switch (action.type) {
    case 'GET_NEWS_LIST':
      state[`${id}${news}${did}${name}${wd}${letter}${day}${order}${limit}`] = data
      return merge({}, state, {})
    default:
      return state
  }
}

export const getNews = (state, id, news, did, name, wd, letter, day, order, limit) => {
  const ids = `${id}${news}${did}${name}${wd}${letter}${day}${order}${limit}`
  return state.news[ids] ? state.news[ids] : {}
}
