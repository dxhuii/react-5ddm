// 生产环境配置
let config = {
  // 正式环境
  debug: false,

  IS9: false,

  ISAD: true,

  NAME: '9站',

  // 域名完整地址
  DOMAIN: 'https://dev.99496.com',

  // 接口地址
  API: 'https://api.99496.com/',

  // 服务端口
  PORT: 6666,

  // 登录token，cookie 的名称
  AUTH_COOKIE_NAME: 'signin',

  COOKIE_PREFIX: 'ikf_',

  // https://github.com/css-modules/css-modules
  CLASS_SCOPED_NAME: '[hash:base64:8]',

  // 前端打包后，静态资源路径前缀
  // 生成效果如：//dev.99496.com/app.bundle.js
  PUBLIC_PATH: '//dev.99496.com/dist/client',

  // 添加内容到模版的head中
  HEAD: `
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0">
    <link rel="icon" href="/favicon.ico" />
  `,

  // 添加分析统计脚本
  ANALYSIS_SCRIPT: ``,

  // google 分析
  // UA-*****-1
  GA: 'UA-63362690-1',

  // google广告
  GooleAdSense: {
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
  },
  // 联系我们的邮箱地址
  EMAIL: 'dxhuii@qq.com',

  // 备案号
  ICP: ''
}

// 开发环境配置
if (process.env.NODE_ENV == 'development') {
  config.debug = true
  config.PORT = 4000
  config.CLASS_SCOPED_NAME = '[name]_[local]__[hash:base64:5]'
  config.DOMAIN = '//localhost:4000'
  config.PUBLIC_PATH = 'http://localhost:4000'
}

module.exports = config
