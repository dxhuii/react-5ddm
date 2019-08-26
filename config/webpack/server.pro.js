const baseConfig = require('./server.base')
const WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const config = {
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
    })
  ],
  mode: 'production'
}

module.exports = config
