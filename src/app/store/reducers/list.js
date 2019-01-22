import merge from 'lodash/merge'

export default function list(state = {}, action = {}) {
  const { data, name } = action
  switch (action.type) {
    case 'GET_LIST':
      state[name] = data
      return merge({}, state, {})

    default:
      return state
  }
}

export const getList = (state, id, mcid, year, area, wd, letter, lz, order) => {
  const ids = `${id}${mcid}${year}${area}${wd}${letter}${lz}${order}`
  return state.list[ids] ? state.list[ids] : {}
}
