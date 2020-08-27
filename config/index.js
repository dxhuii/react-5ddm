/**
 * 生产环境配置
 * API 接口地址
 * debug 是否开发
 * NAME 网站名称
 * DESCRIBE 网站首页标题
 * KEYWORDS 关键词
 * DESCRIPTION 描述
 * DOMAIN_NAME 网站主域名称
 * DOMAIN 网站带 HTTPS 完整域名
 * PORT 端口
 * AUTH_COOKIE_NAME 登录 cookie 名称
 * COOKIE_PREFIX cookie 前缀
 * CLASS_SCOPED_NAME css-modules 规则 https://github.com/css-modules/css-modules
 * PUBLIC_PATH 前端打包后，静态资源路径前缀 生成效果如：//www.5ddm.com/app.bundle.js
 * HEAD 添加内容到模版的head中
 * BAIDU_STAT 百度统计
 * CNZZ_STAT CNZZ统计
 * GA 谷歌分析
 * EMAIL 邮箱
 * weiboName 微博名称
 */

const DOMAIN_NAME = '5ddm.com'

const conf = {
  debug: false,
  CLASS_SCOPED_NAME: '[hash:base64:5]',
  AUTH_COOKIE_NAME: 'auth',
  CACHA_TIME: 300000,
  weiboName: '5d动漫',
  // [选填] google广告
  googleAdSense: {
    client: 'pub-1710184184266697',
    slot: {
      pc: '3946387868',
      h5: '3946387868'
    }
  },
  HEAD: `<meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0">
  `
}
/**
 * 5ddm.com
 *
 */
const defalut = {
  API: 'https://www.5ddm.com/home.php/',
  NAME: '5D动漫(5站)',
  DESCRIBE: '5D动漫(5站) - 无广告免费的动漫网站',
  KEYWORDS: '5D动漫,5站',
  DESCRIPTION: '5D动漫(5站)致力于为所有动漫迷们免费提供最新最快的高清动画下载及在线观看资源索引。',
  DOMAIN: 'https://www.5ddm.com',
  DOMAIN_NAME: '5ddm.com',
  PORT: 8080,
  COOKIE_PREFIX: 'ddm_',
  PUBLIC_PATH: '',
  BAIDU_STAT: '9449f42e45055b4f70ad84574c4c65c8',
  CNZZ_STAT: '1279219478',
  GA: 'UA-176562013-1',
  EMAIL: 'ddm_com@outlook.com'
}

/**
 * kanfan.net
 *
 */
const kanfan = {
  API: 'https://www.5ddm.com/home.php/',
  NAME: '看番',
  DESCRIBE: '看番 - 您的追番网站',
  KEYWORDS: '看番',
  DESCRIPTION: '看番致力于为所有动漫迷们免费提供最新最快的高清动画下载及在线观看资源索引。',
  DOMAIN: 'https://www.kanfan.net',
  DOMAIN_NAME: 'kanfan.net',
  PORT: 6669,
  COOKIE_PREFIX: 'kanfan_',
  PUBLIC_PATH: '//www.kanfan.net',
  BAIDU_STAT: '2181f9da0f7a8cdc001129fb5010a473',
  CNZZ_STAT: '1277233437',
  GA: 'UA-7957076-10',
  EMAIL: 'kanfan_net@outlook.com'
}

let config = {}
let ico = ''
if (DOMAIN_NAME === 'kanfan.net') {
  config = Object.assign({}, conf, kanfan)
  ico = 'kanfan_'
} else {
  config = Object.assign({}, conf, defalut)
}

config.HEAD += `<link rel="icon" href="/${ico}favicon.ico" />`

// 开发环境配置
if (process.env.NODE_ENV === 'development') {
  config.debug = true
  config.PORT = 4000
  config.CLASS_SCOPED_NAME = '[name]_[local]__[hash:base64:5]'
  config.DOMAIN = '//localhost:4000'
  config.PUBLIC_PATH = 'http://localhost:4000'
}

module.exports = config
