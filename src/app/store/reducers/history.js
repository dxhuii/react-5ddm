import merge from 'lodash/merge'

export default function() {
  let initialState = {
    data: []
  }

  return function history(state = initialState, action = {}) {
    const { name, data } = action
    switch (action.type) {
      case 'ADD_HISTORY':
        state.data.push(action.page)
        return state
      case 'GET_PLAY_LOG':
        state[name] = data
        return merge({}, state, {})
      // 清空
      case 'CLEAN':
        return {
          data: []
        }

      default:
        return state
    }
  }
}

export function getLastHistory(state) {
  return state.history.data[state.history.length - 1]
}

export function findHistory(state, page) {
  if (state.history.data.length == 0) return true
  return state.history.data.indexOf(page) != -1 ? true : false
}

export const getplaylog = (state, id) => {
  return state.history[id] ? state.history[id] : {}
}
