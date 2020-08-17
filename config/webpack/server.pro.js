const baseConfig = require('./server.base')
const WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const config = {
  mode: 'production',
  ...baseConfig,
  plugins: [
    ...baseConfig.plugins,
    // 清空打包目录
    new CleanWebpackPlugin({
      verbose: true
    })
  ]
}

module.exports = config
