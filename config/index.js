/**
 * 生产环境配置
 * debug 是否开发
 * IS9 是否是 9 站
 * ISPLAY 是否播放
 * ISAD 是否显示广告
 * NAME 网站名称
 * DOMAIN_NAME 网站主域名称
 * DOMAIN 网站带 HTTPS 完整域名
 * API 接口地址
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

const DOMAIN_NAME = '99496.com'

const conf = {
  debug: false,
  API: 'https://api.99496.com/',
  CLASS_SCOPED_NAME: '[hash:base64:8]',
  AUTH_COOKIE_NAME: 'auth',
  HEAD: `
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0">
  `
}
const defalut = {
  IS9: true,
  ISPLAY: false,
  ISAD: true,
  NAME: '9站',
  DOMAIN_NAME: '99496.com',
  DOMAIN: 'https://dev.99496.com',
  PORT: 6666,
  COOKIE_PREFIX: 'ikf_',
  PUBLIC_PATH: '//dev.99496.com/dist/client',
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
  IS9: false,
  ISPLAY: false,
  ISAD: true,
  NAME: '丁丁动漫_嘀嘀动漫',
  DOMAIN_NAME: 'dddm.tv',
  DOMAIN: 'https://www.dddm.tv',
  PORT: 8888,
  COOKIE_PREFIX: 'dddm_',
  PUBLIC_PATH: '//cos.mdb6.com/dddm/client',
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
  IS9: false,
  ISPLAY: true,
  ISAD: false,
  NAME: '5D动漫_5站',
  DOMAIN_NAME: '5ddm.com',
  DOMAIN: 'https://www.5ddm.com',
  PORT: 7777,
  COOKIE_PREFIX: 'ddm_',
  PUBLIC_PATH: '//cos.mdb6.com/5ddm',
  BAIDU_STAT: '9449f42e45055b4f70ad84574c4c65c8',
  CNZZ_STAT: '1276171240',
  GA: 'UA-7957076-8',
  EMAIL: 'ddm_com@outlook.com',
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
