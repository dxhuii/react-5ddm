/**
 * 生产环境配置
 * API 接口地址
 * debug 是否开发
 * ISPLAY 是否播放
 * ISAD 是否显示广告
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
 * PUBLIC_PATH 前端打包后，静态资源路径前缀 生成效果如：//dev.99496.com/app.bundle.js
 * HEAD 添加内容到模版的head中
 * BAIDU_STAT 百度统计
 * CNZZ_STAT CNZZ统计
 * GA 谷歌分析
 * EMAIL 邮箱
 * ICP 备案号
 * WW 文网文
 */

const DOMAIN_NAME = '5ddm.com'

const conf = {
  debug: false,
  CLASS_SCOPED_NAME: '[hash:base64:5]',
  AUTH_COOKIE_NAME: 'auth',
  CACHA_TIME: 300000,
  HEAD: `<meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0">
    <script src="//cos.mdb6.com/static/devtools-detector.js"></script>
  `
}
const defalut = {
  API: 'https://api.99496.com/',
  ISPLAY: false,
  ISAD: true,
  NAME: '99496动漫(9站)',
  DESCRIBE: '99496动漫(9站) - 小而美的动漫网站',
  KEYWORDS: '9站, 99496动漫',
  DESCRIPTION: '99496动漫(9站)致力于为所有动漫迷们免费提供最新最快的高清动画下载及在线观看资源索引。',
  DOMAIN: 'https://dev.99496.com',
  DOMAIN_NAME: '99496.com',
  PORT: 6666,
  COOKIE_PREFIX: 'plain_',
  PUBLIC_PATH: '//dev.99496.com',
  BAIDU_STAT: 'b3c1facee308e3a3450dc7f836101938',
  CNZZ_STAT: '5862511',
  GA: 'UA-63362690-1',
  EMAIL: 'dxhuii@qq.com',
  ICP: '沪ICP备16032125号-1',
  WW: '沪网文(2017)1295-032号',
  BEIAN: true
}
/**
 * dddm.tv
 */
const dddm = {
  API: 'https://api.99496.com/',
  ISPLAY: false,
  ISAD: true,
  NAME: '丁丁动漫',
  DESCRIBE: '丁丁动漫_一个可以在线看的动漫网站',
  KEYWORDS: '丁丁动漫',
  DESCRIPTION: '丁丁动漫致力于为所有动漫迷们免费提供最新最快的高清动画下载及在线观看资源索引。',
  DOMAIN: 'https://www.dddm.tv',
  DOMAIN_NAME: 'dddm.tv',
  PORT: 6667,
  COOKIE_PREFIX: 'dddm_',
  PUBLIC_PATH: '//www.dddm.tv',
  BAIDU_STAT: 'aee66555ebcf1b95945961320239ae30',
  CNZZ_STAT: '1274947867',
  GA: 'UA-7957076-9',
  EMAIL: 'dddmtv@outlook.com',
  ICP: '',
  WW: '',
  BEIAN: false
}
/**
 * 5ddm.com
 *
 */
const ddm = {
  API: 'http://test.99496.com/',
  ISPLAY: false,
  ISAD: false,
  NAME: '5D动漫(5站)',
  DESCRIBE: '5D动漫(5站) - 无广告免费的动漫网站',
  KEYWORDS: '5D动漫,5站',
  DESCRIPTION: '5D动漫(5站)致力于为所有动漫迷们免费提供最新最快的高清动画下载及在线观看资源索引。',
  DOMAIN: 'https://www.5ddm.com',
  DOMAIN_NAME: '5ddm.com',
  PORT: 6668,
  COOKIE_PREFIX: 'ddm_',
  PUBLIC_PATH: '//www.5ddm.com',
  BAIDU_STAT: '9449f42e45055b4f70ad84574c4c65c8',
  CNZZ_STAT: '1276171240',
  GA: 'UA-7957076-8',
  EMAIL: 'ddm_com@outlook.com',
  ICP: '',
  WW: '',
  BEIAN: false
}

/**
 * kanfan.net
 *
 */
const kanfan = {
  API: 'https://api.99496.com/',
  ISPLAY: true,
  ISAD: false,
  NAME: '看番',
  DESCRIBE: '看番 - 您的追番网站',
  KEYWORDS: '看番',
  DESCRIPTION: '看番致力于为所有动漫迷们免费提供最新最快的高清动画下载及在线观看资源索引。',
  DOMAIN: 'https://www.kanfan.net',
  DOMAIN_NAME: 'kanfan.net',
  PORT: 6669,
  COOKIE_PREFIX: 'kanfan_',
  PUBLIC_PATH: '//www.kanfan.net',
  BAIDU_STAT: '0014e9ce85a5c0d765e1913cf93cf939',
  CNZZ_STAT: '1277233437',
  GA: 'UA-7957076-10',
  EMAIL: 'kanfan_net@outlook.com',
  ICP: '',
  WW: '',
  BEIAN: false
}

let config = {},
  ico = ''
if (DOMAIN_NAME === 'dddm.tv') {
  config = Object.assign({}, conf, dddm)
  ico = 'dd_'
} else if (DOMAIN_NAME === '5ddm.com') {
  config = Object.assign({}, conf, ddm)
  ico = '5d_'
} else if (DOMAIN_NAME === 'kanfan.net') {
  config = Object.assign({}, conf, kanfan)
  ico = 'kanfan_'
} else {
  config = Object.assign({}, conf, defalut)
}

config.HEAD += `<link rel="icon" href="/${ico}favicon.ico" />`

// 开发环境配置
if (process.env.NODE_ENV == 'development') {
  config.debug = true
  config.PORT = 4000
  config.CLASS_SCOPED_NAME = '[name]_[local]__[hash:base64:5]'
  config.DOMAIN = '//localhost:4000'
  config.PUBLIC_PATH = 'http://localhost:4000'
}

module.exports = config
