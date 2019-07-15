import cloneObj from '../clone'

let initialState = {}
export default (state = cloneObj(initialState), action = {}) => {
  switch (action.type) {
    case 'GET_NEWS_ARTICLE':
      var { name, data } = action
      if ((name, data)) state[name] = data
      break
    default:
      return state
  }
  return cloneObj(state)
}

export const getArticle = (state, name) => state.article[name] || {}
