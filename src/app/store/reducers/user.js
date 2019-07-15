import cloneObj from '../clone'

let initialState = {}
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case 'SAVE_USER_INFO':
      if (action.data) state = action.data
      break
    default:
      return state
  }
  return cloneObj(state)
}

// 获取用户信息
export const getUserInfo = state => state.user || {}
