const baseConfig = require('./client.base')

// const path = require('path');

const config = {
  ...baseConfig,
  mode: 'production'
}

module.exports = config
