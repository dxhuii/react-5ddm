import { combineReducers } from 'redux'
import merge from 'lodash/merge'

import user from './user'
import week from './week'
import detail from './detail'
import playlist from './playlist'
import player from './player'
import top from './top'
import list from './list'
import slide from './slide'
import news from './news'
import article from './article'
import config from './config'
import episode from './episode'

let states = {
  user,
  week,
  detail,
  playlist,
  player,
  top,
  list,
  slide,
  news,
  article,
  config,
  episode
}

// 创建一个无数据的states，用于在服务端初始redux数据
let _states = {}
for (let i in states) {
  _states[i] = merge({}, states[i](), {})
}
_states = JSON.stringify(_states)
export const initialStateJSON = _states

// reducer
export default combineReducers(states)
