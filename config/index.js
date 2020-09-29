/**
 * 生产环境配置
 * api 接口地址
 * debug 是否开发
 * name 网站名称
 * describe 网站首页标题
 * keywords 关键词
 * description 描述
 * domain 网站带 HTTPS 完整域名
 * port 端口
 * authCookieNmae 登录 cookie 名称
 * cookiePrefix cookie 前缀
 * classScopedName css-modules 规则 https://github.com/css-modules/css-modules
 * publicPath 前端打包后，静态资源路径前缀 生成效果如：//www.5ddm.com/app.bundle.js
 * head 添加内容到模版的head中
 * baiduStat 百度统计
 * cnzzStat CNZZ统计
 * ga 谷歌分析
 * eMail 邮箱
 * weiboName 微博名称
 */

const config = {
  debug: false,
  classScopedName: '[hash:base64:5]',
  authCookieNmae: 'auth',
  cookiePrefix: 'geekacg_',
  cacheTime: 300000,
  weiboName: '5d动漫',
  head: `<meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0">
    <link rel="icon" href="/favicon.ico" />
  `,
  api: 'https://api.5ddm.com/',
  name: 'Geekacg',
  describe: 'Geekacg - 你的二次元主页',
  keywords: 'Geekacg,极客动漫,二次元导航,二次元主页',
  description: 'Geekacg - 及时收录动漫网站及资讯、动画、漫画、音乐等内容，让您的二次元网络生活更简单精彩。',
  domain: 'https://www.geekacg.com',
  port: 9999,
  publicPath: '//99496-1251036128.file.myqcloud.com/geekacg',
  baiduStat: 'dac7d3d29140921f2cfb16fe78565450',
  cnzzStat: '1279307969',
  ga: 'UA-176562013-2',
  // [选填] google广告
  googleAdSense: {
    client: 'pub-1710184184266697',
    slot: {
      pc: '3946387868',
      h5: '3946387868'
    }
  },
  eMail: 'geekacg@outlook.com'
}

// 开发环境配置
if (process.env.NODE_ENV === 'development') {
  config.debug = true
  config.cacheTime = 0
  config.port = 4000
  config.classScopedName = '[name]_[local]__[hash:base64:5]'
  config.domain = '//localhost:4000'
  config.publicPath = 'http://localhost:4000'
  config.ga = ''
  config.googleAdSense = ''
}

module.exports = config
