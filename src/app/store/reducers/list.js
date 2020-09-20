import cloneObj from '../clone'

const initialState = {}
export default (state = cloneObj(initialState), action = {}) => {
  const { data, name } = action
  switch (action.type) {
    case 'GET_LIST':
      if (data && name) state[name] = data
      break
    case 'GET_SEARCH':
      if (data && name) state[name] = data
      break
    case 'GET_RECOMMEND':
      if (data && name) state[name] = data
      break
    case 'GET_TOP':
      if (data && name) state[name] = data
      break
    case 'GET_WEEK':
      if (data && name) state[name] = data
      break
    case 'GET_DETAIL_ACTOR':
      if (data && name) state[name] = data
      break
    case 'GET_ARTICLE_VOD':
      if (data && name) state[name] = data
      break
    case 'GET_HOT_WEEK':
      if (data && name) state[name] = data
      break
    case 'GET_TOP_LIST':
      if (data && name) state[name] = data
      break
    default:
      return state
  }
  return cloneObj(state)
}

export const getList = (state, name) => state.list[name] || {}
