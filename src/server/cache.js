import { CACHA_TIME } from 'Config'

var LRU = require('lru-cache')
  , options = { max: 100, maxAge: CACHA_TIME }
  , cache = new LRU(options);

if (!CACHA_TIME) {
  cache = {
    get: () => '',
    set: () => ''
  }
}

export default cache