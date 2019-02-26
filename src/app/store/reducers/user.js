import merge from 'lodash/merge'

export default function() {
  let initialState = {}
  return function user(state = initialState, action = {}) {
    switch (action.type) {
      case 'SAVE_USER_INFO':
        state = action.data
        return merge({}, state, {})
      case 'CLEAN':
        return {}

      default:
        return state
    }
  }
}

// 获取用户信息
export const getUserInfo = state => state.user || {}
