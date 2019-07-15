import cloneObj from '../clone'

let initialState = {}
export default (state = cloneObj(initialState), action = {}) => {
  const { name, data } = action
  switch (action.type) {
    case 'GET_NEWS_INDEX_LIST':
      if (name && data) state[name] = data
      break
    default:
      return state
  }
  return cloneObj(state)
}

export const getNewsIndex = (state, name, id) => {
  const ids = name === 'newslist' && id !== 44 ? id : name
  console.log(state, ids)
  return state.newsIndex[ids] ? state.newsIndex[ids] : {}
}
