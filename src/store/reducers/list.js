import merge from 'lodash/merge'

export default function list(state = {}, action = {}) {
  switch (action.type) {

    case 'GET_LIST':
      const { stateId, id, data, mcid, year, area, letter, lz, day, order, limit } = action
      state[`${stateId}${id}${mcid}${year}${area}${letter}${lz}${day}${order}${limit}`] = data
      return merge({}, state, {})

    default:
      return state
  }
}

export const getList = (state, stateId, id, mcid, year, area, letter, lz, day, order, limit) => {
  const ids = `${stateId}${id}${mcid}${year}${area}${letter}${lz}${day}${order}${limit}`
  return state.list[ids] ? state.list[ids] : {}
}
