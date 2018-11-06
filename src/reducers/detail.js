import merge from 'lodash/merge'

export default function detail(state = {}, action = {}) {
  switch (action.type) {

    case 'GET_DETAIL':
      var { id, data } = action
      state[id] = data
      return merge({}, state, {})
    case 'GET_MARK':
      var { data, type, id, cid } = action
      state[`${type}_${id}_${cid}`] = data
      return merge({}, state, {})
    case 'GET_SCORE':
      var { data, id, sid, uid } = action
      state[`${id}_${sid}_${uid}`] = data
      return merge({}, state, {})
    default:
      return state
  }
}

export const getDetail = (state, id) => {
  return state.detail[id] ? state.detail[id] : {};
}

export const getMark = (state, type, id, cid) => {
  const ids = `${type}_${id}_${cid}`
  return state.detail[ids] ? state.detail[ids] : {};
}

export const getScore = (state, id, sid, uid) => {
  const ids = `${id}_${sid}_${uid}`
  return state.detail[ids] ? state.detail[ids] : {};
}
