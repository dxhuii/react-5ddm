import { cacheTime } from 'Config'

var LRU = require('lru-cache')
var options = { max: 100, maxAge: cacheTime }
var cache = new LRU(options)

if (!cacheTime) {
  cache = {
    get: () => '',
    set: () => ''
  }
}

export default cache
