import { combineReducers } from 'redux'

import user from './user'
import week from './week'
import detail from './detail'
import playlist from './playlist'
import player from './player'
import top from './top'
import list from './list'
import slide from './slide'
import newsIndex from './newsIndex'
import article from './article'
import config from './config'
import episode from './episode'
import recommend from './recommend'
import detailActor from './actor'
import scroll from './scroll'
import history from './history'
import search from './search'
import articleVod from './articleVod'
import month from './month'
import page from './page'
import ads from './ads'

let states = {
  user,
  week,
  detail,
  playlist,
  player,
  top,
  list,
  slide,
  newsIndex,
  article,
  config,
  episode,
  recommend,
  detailActor,
  search,
  articleVod,
  month,
  page,
  ads,
  scroll: scroll(),
  history: history()
}

// reducer
export default combineReducers(states)
