
import { combineReducers } from 'redux';
import merge from 'lodash/merge';

import user from './user';
import posts from './posts';
import week from './week'
import detail from './detail'
import playlist from './playlist'
import player from './player'
import top from './top'
import list from './list'
import search from './search'

let states = {
  user,
  posts,
  week,
  detail,
  playlist,
  player,
  top,
  list,
  search
}

// 创建一个无数据的states，用于在服务端初始redux数据
let _states = {};
for (let i in states) {
  _states[i] = merge({}, states[i](), {})
}
_states = JSON.stringify(_states);
export const initialStateJSON = _states;

// reducer
export default combineReducers(states);
