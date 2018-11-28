// 生产环境配置
let config = {
  // 正式环境
  debug: false,

  name: '9站',

  // 域名
  host: 'localhost',

  // 接口地址
  api: 'https://api.99496.com/',

  // 服务端口
  port: 4000,

  // 登录token，cookie 的名称
  auth_cookie_name: 'signin-cookie',

  COOKIE_PREFIX: 'ikf_',

  // https://github.com/css-modules/css-modules
  class_scoped_name: '[hash:base64:8]',

  // 前端打包后，静态资源路径前缀
  // 生成效果如：//localhost:4000/app.bundle.js
  publicPath: '//localhost:4000',

  redirectUrl: '//dev.99496.com',

  favicon: '<link rel="icon" href="//m.99496.com/favicon.ico" />',

  // 添加内容到模版的head中
  head: `
    <meta name="renderer" content="webkit|ie-comp|ie-stand">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0">
  `,

  // 添加分析统计脚本
  analysis_script: ``,

  // google 分析
  // UA-*****-1
  GA: '',

  // google广告
  Goole_AdSense: {
    /*
    sidebar: {
      client: '',
      slot: '',
      style: { display: 'inline-block', width: '250px', height: '250px' }
    },
    // 详情页面的广告
    postsDetail: {
      client: '',
      slot: '',
      style: { display: 'block', height:'100px' }
      // format: 'auto',
      // responsive: 'true'
    }
    */
  }
}

config.head += config.favicon

// 开发环境配置
if (process.env.NODE_ENV == 'development') {
  config.debug = true
  config.class_scoped_name = '[name]_[local]__[hash:base64:5]'
}

module.exports = config
