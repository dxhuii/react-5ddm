import merge from 'lodash/merge'

export default function list(state = {}, action = {}) {
  const { stateId, id, data, mcid, year, area, wd, letter, lz, day, order, limit } = action
  switch (action.type) {
    case 'GET_LIST':
      state[`${stateId}${id}${mcid}${year}${area}${wd}${letter}${lz}${day}${order}${limit}`] = data
      return merge({}, state, {})

    default:
      return state
  }
}

export const getList = (state, stateId, id, mcid, year, area, wd, letter, lz, day, order, limit) => {
  const ids = `${stateId}${id}${mcid}${year}${area}${wd}${letter}${lz}${day}${order}${limit}`
  return state.list[ids] ? state.list[ids] : {}
}
