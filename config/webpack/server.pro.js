const baseConfig = require('./server.base')

const config = {
  ...baseConfig,
  plugins: [...baseConfig.plugins],
  mode: 'production'
}

module.exports = config
