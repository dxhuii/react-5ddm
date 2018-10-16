import merge from 'lodash/merge';

export default function detail(state = {}, action = {}) {
  switch (action.type) {

    case 'GET_DETAIL':
      const { id, data } = action;
      state[id] = data;
      return merge({}, state, {});

    default:
      return state;
  }
}

export const getDetail = (state, id) => {
  return state.detail[id] ? state.detail[id] : {};
}
