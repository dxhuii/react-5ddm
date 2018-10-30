import merge from 'lodash/merge'

export default function list(state = {}, action = {}) {
  switch (action.type) {

    case 'GET_LIST':
      const { id, data, limit, order, day, mcid, area, year, letter } = action
      state[`${id}${limit}${order}${day}${mcid}${area}${year}${letter}`] = data
      return merge({}, state, {})

    default:
      return state
  }
}

export const getList = (state, id, limit, order, day, mcid, area, year, letter) => {
  const ids = `${id}${limit}${order}${day}${mcid}${area}${year}${letter}`
  return state.list[ids] ? state.list[ids] : {}
}
