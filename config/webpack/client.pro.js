const baseConfig = require('./client.base')
const WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const WorkboxPlugin = require('workbox-webpack-plugin')
const config = require('../index')

// const path = require('path');

const webpackConfig = {
  ...baseConfig,
  plugins: [
    new WebpackParallelUglifyPlugin({
      uglifyJS: {
        output: {
          beautify: false, //不需要格式化
          comments: false //不保留注释
        },
        compress: {
          warnings: false, // 在UglifyJs删除没有用到的代码时不输出警告
          drop_console: true, // 删除所有的 `console` 语句，可以兼容ie浏览器
          collapse_vars: true, // 内嵌定义了但是只用到一次的变量
          reduce_vars: true // 提取出出现多次但是没有定义成变量去引用的静态值
        }
      }
    }),
    new BundleAnalyzerPlugin(),
    new WorkboxPlugin.GenerateSW({
      cacheId: config.SWNAME,
      importWorkboxFrom: 'local',
      exclude: [/\.(png|jpe?g|gif|svg|webp|ejs)$/i, /\.map$/, /^manifest.*\\.js(?:on)?$/],
      skipWaiting: true,
      clientsClaim: true,
      runtimeCaching: [
        {
          urlPattern: /\.(?:png|jpg|jpeg|svg|webp)$/,
          handler: 'cacheFirst',
          options: {
            cacheName: 'images',
            expiration: {
              maxEntries: 20
            }
          }
        }
      ]
    }),
    // new ManifestPlugin({ fileName: 'manifest.json' }),
    ...baseConfig.plugins
  ],
  mode: 'production'
}

module.exports = webpackConfig
