const webpack = require('webpack')
const HtmlwebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const chalk = require('chalk')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin')

const config = require('../index')
const devMode = process.env.NODE_ENV === 'development'

/**
 * 配置 autoprefixer 各浏览器前缀
 * postcss-flexbugs-fixes 检查flex错误
 *  */
const postcssConfig = {
  loader: 'postcss-loader',
  options: {
    plugins: () => [
      require('postcss-flexbugs-fixes'),
      require('autoprefixer')({
        browsers: ['last 2 versions'] // https://browserl.ist/?q=last+2+version
      })
    ]
  }
}

module.exports = {
  name: 'client',
  target: 'web',

  entry: {
    app: [
      '@babel/polyfill',
      // ArriveFooter 监听抵达页尾的事件
      './src/app/utils/arrive-footer.js',
      /**
       * 懒加载图片、Dom
       * 使用方式
       * 给dom添加class="load-demand"、data-load-demand="<div></div> or <img />"
       **/
      './src/app/utils/load-demand.js',
      './src/client/index.js'
    ]
  },

  output: {
    path: path.resolve(__dirname, '../../dist/client'),
    filename: devMode ? '[name].bundle.js' : '[name].[hash].js',
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

  optimization: {
    namedModules: true,
    noEmitOnErrors: true,
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /(\.css|\.scss)$/,
          chunks: 'all',
          enforce: true
        },
        commons: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all'
        }
      }
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // set to true if you want JS source maps,
        uglifyOptions: {
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
      new OptimizeCSSAssetsPlugin({})
    ]
  },

  module: {
    rules: [
      // js 文件解析
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: [
          'css-hot-loader',
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: `css`,
            options: {
              modules: true,
              localIdentName: config.CLASS_SCOPED_NAME,
              minimize: true,
              sourceMap: true,
              importLoaders: 1
            }
          },
          {
            loader: `sass`
          },
          { ...postcssConfig }
        ]
      },

      // css 解析
      {
        test: /\.css$/,
        use: [
          'css-hot-loader',
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: `css`
          },
          { ...postcssConfig }
        ]
      },

      {
        test: /\.(png|jpe?g|gif|bmp|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // 配置图片编译路径
              limit: 8192, // 小于8k将图片转换成base64
              name: '[name].[hash:8].[ext]',
              outputPath: 'images/'
            }
          },
          {
            loader: 'image-webpack-loader', // 图片压缩
            options: {
              bypassOnDebug: true
            }
          }
        ]
      },

      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'fonts/[name].[hash:8].[ext]'
        }
      }

      // // 小于8K的图片，转 base64
      // {
      //   test: /\.(png|jpg|gif)$/,
      //   loader: 'url?limit=8192'
      // },

      // // 小于8K的字体，转 base64
      // {
      //   test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      //   loader: 'file?limit=8192'
      // }
    ]
  },

  plugins: [
    // new webpack.ProvidePlugin({
    //   $: "jquery",
    //   jQuery: "jquery"
    // }),

    new webpack.DefinePlugin({
      __SERVER__: 'false',
      __CLIENT__: 'true'
    }),

    // 提取css插件
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css'
    }),

    // 创建视图模版文件，给server使用
    // 主要是打包后的添加的css、js静态文件路径添加到模版中
    new HtmlwebpackPlugin({
      filename: path.resolve(__dirname, '../../dist/server/index.ejs'),
      template: `src/app/views/index${config.DOMAIN_NAME === 'dddm.tv' ? '_dddm' : ''}.html`,
      metaDom: '<%- meta %>',
      htmlDom: '<%- html %>',
      reduxState: '<%- reduxState %>',
      head: config.HEAD
      // inject: false
    }),

    new ProgressBarPlugin({
      format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
      clear: false
    }),

    new CopyWebpackPlugin([
      { from: 'src/app/static/favicon.ico', to: 'favicon.ico' },
      { from: 'src/app/static/5d_favicon.ico', to: '5d_favicon.ico' },
      { from: 'src/app/static/dd_favicon.ico', to: 'dd_favicon.ico' }
    ]),

    new WorkboxPlugin.GenerateSW({
      importWorkboxFrom: 'local',
      skipWaiting: true,
      clientsClaim: true,
      runtimeCaching: [
        {
          // To match cross-origin requests, use a RegExp that matches
          // the start of the origin:
          urlPattern: new RegExp('^https://api'),
          handler: 'staleWhileRevalidate',
          options: {
            // Configure which responses are considered cacheable.
            cacheableResponse: {
              statuses: [200]
            }
          }
        },
        {
          urlPattern: new RegExp('^https://cos'),
          // Apply a network-first strategy.
          handler: 'networkFirst',
          options: {
            // Fall back to the cache after 2 seconds.
            networkTimeoutSeconds: 2,
            cacheableResponse: {
              statuses: [200]
            }
          }
        }
      ]
    })

    // serviceworker 还在研究中
    // new ServiceWorkerWebpackPlugin({
    //   entry: path.join(__dirname, 'client/sw.js'),
    // })
  ]
}
