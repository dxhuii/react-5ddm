const baseConfig = require('./client.base')
const WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const OfflinePlugin = require('offline-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const webpackConfig = {
  mode: 'production',
  ...baseConfig,
  plugins: [
    // 清空打包目录
    new CleanWebpackPlugin({
      verbose: true
    }),

    new CopyWebpackPlugin([
      { from: 'src/app/static/favicon.ico', to: 'favicon.ico' },
      { from: 'src/app/static/5d_favicon.ico', to: '5d_favicon.ico' },
      { from: 'src/app/static/dd_favicon.ico', to: 'dd_favicon.ico' }
      // { from: 'config/manifest.json', to: 'manifest.json' }
    ]),

    new BundleAnalyzerPlugin(),
    new OfflinePlugin({
      autoUpdate: 1000 * 60 * 5,
      ServiceWorker: {
        publicPath: '/sw.js'
      }
    }),
    ...baseConfig.plugins
  ]
}

module.exports = webpackConfig
