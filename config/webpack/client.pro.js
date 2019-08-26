const baseConfig = require('./client.base')
const WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const OfflinePlugin = require('offline-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const webpackConfig = {
  ...baseConfig,
  plugins: [
    ...baseConfig.plugins,
    new WebpackParallelUglifyPlugin({
      uglifyJS: {
        warnings: false, // 在UglifyJs删除没有用到的代码时不输出警告
        output: {
          beautify: false, //不需要格式化
          comments: false //不保留注释
        },
        compress: {
          drop_console: true, // 删除所有的 `console` 语句，可以兼容ie浏览器
          collapse_vars: true, // 内嵌定义了但是只用到一次的变量
          reduce_vars: true // 提取出出现多次但是没有定义成变量去引用的静态值
        }
      }
    }),
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
    })
    // new ManifestPlugin({ fileName: 'manifest.json' }),
  ],
  mode: 'production'
}

module.exports = webpackConfig
