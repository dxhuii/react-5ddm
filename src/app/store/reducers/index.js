import { combineReducers } from 'redux'

import user from './user'
import detail from './detail'
import playlist from './playlist'
import player from './player'
import list from './list'
import slide from './slide'
import newsIndex from './newsIndex'
import article from './article'
import config from './config'
import episode from './episode'
import scroll from './scroll'
import history from './history'
import month from './month'
import game from './game'

export default function() {
  const states = {
    user: user(),
    detail: detail(),
    playlist: playlist(),
    player: player(),
    list: list(),
    slide: slide(),
    newsIndex: newsIndex(),
    article: article(),
    config: config(),
    episode: episode(),
    month: month(),
    scroll: scroll(),
    history: history(),
    game: game()
  }

  return combineReducers(states)
}
