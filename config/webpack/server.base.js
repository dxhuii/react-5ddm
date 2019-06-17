const webpack = require('webpack')
const path = require('path')
const chalk = require('chalk')
const nodeExternals = require('webpack-node-externals')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const config = require('../index')

module.exports = {
  name: 'server',
  target: 'node',

  entry: {
    app: [
      // '@babel/polyfill',
      './src/server/index'
    ]
  },

  externals: [
    nodeExternals({
      // we still want imported css from external files to be bundled otherwise 3rd party packages
      // which require us to include their own css would not work properly
      whitelist: /\.css$/
    })
  ],

  output: {
    path: path.resolve(__dirname, '../../dist/server'),
    filename: 'server.js',
    publicPath: config.PUBLIC_PATH + '/'
  },

  resolve: {
    alias: {
      '@': path.resolve('src/app'),
      Config: path.resolve('config/index')
    }
  },

  resolveLoader: {
    moduleExtensions: ['-loader']
  },

  module: {
    rules: [
      // js 文件解析
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        loader: 'babel'
      },

      // scss 文件解析
      {
        test: /\.scss$/,
        use: [
          {
            loader: `css/locals`,
            options: {
              modules: true,
              localIdentName: config.CLASS_SCOPED_NAME
              // minimize: true,
              // sourceMap: true

              // camelCase: true,
              // importLoaders: 1,
              // modules: true,
              // localIdentName: config.CLASS_SCOPED_NAME
            }
          },
          {
            loader: `sass`
          }
        ]
      },

      // css 解析
      {
        test: /\.css$/,
        use: [
          {
            loader: `css/locals`
          }
        ]
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      __SERVER__: 'true',
      __CLIENT__: 'false'
    }),

    // 清空打包目录
    new CleanWebpackPlugin({
      verbose: true
    }),

    new ProgressBarPlugin({
      format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
      clear: false
    })

    // new CopyWebpackPlugin([
    //   { from: 'src/server/amp/views', to: 'views/' }
    // ])
  ]
}
