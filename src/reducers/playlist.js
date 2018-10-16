import merge from 'lodash/merge';

export default function playlist(state = {}, action = {}) {
  switch (action.type) {

    case 'GET_PLAY_LIST':
      const { id, data } = action;
      state[id] = data;
      return merge({}, state, {});

    default:
      return state;
  }
}

export const getPlayList = (state, id) => {
  return state.playlist[id] ? state.playlist[id] : {};
}
