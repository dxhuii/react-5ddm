import { isMobile } from './index'
import { IS9, DOMAIN_NAME, DOMAIN } from 'Config'

const isP = IS9 && !isMobile()

const playH = '100%'

const iframe = url => {
  return `<iframe src="${url}" width="100%" height="${playH}" frameborder="0" scrolling=no  allowfullscreen="allowfullscreen" mozallowfullscreen="mozallowfullscreen" msallowfullscreen="msallowfullscreen" oallowfullscreen="oallowfullscreen" webkitallowfullscreen="webkitallowfullscreen" id="ckplayer"></iframe>`
}

const HTML = (pv, isLogin, path) => {
  const isJump = /zb|vip/.test(isLogin)
  const url = isJump ? `https://www.5ddm.com${path}` : `https://www.dddm.tv${path}`
  const reUrl = DOMAIN_NAME === '5ddm.com' && isJump ? '' : DOMAIN_NAME === 'dddm.tv' && !isJump ? '' : `<a target="_blank" class="jump" href="${url}">或者点这里试一下</a>`
  return `<div class="explaywrap" style="height:${playH};"><a target="_blank" href="${pv}">亲，请点我播放</a>${reUrl}<p>该视频需要跳转播放<br>请点击上⾯的按钮哦</p></div>`
}

const flash = url => {
  return `<embed src="${url}" width="100%" height="${playH}" bgcolor="#000000" quality="high" allowfullscreen="true" allowscriptaccess="always" id="ckplayer">`
}

const ykIf = data => {
  return '//player.youku.com/embed/' + data + '?client_id=08fa721d0f5abf37'
}

const tudou = pv => {
  const data = pv.split(',')
  const len = data.length
  if (len === 1) {
    youku(pv)
  } else if (len === 2) {
    return '/'
  } else if (len >= 3) {
    youku(data[2])
  }
}
const youku = pv => {
  const data = pv.split(',')
  return ykIf(data.length === 3 ? data[2] : pv)
}
const iqiyi = pv => {
  const plus = isMobile() ? '&tvid=' : '&tvId='
  const data = pv.split(/,|&tvid=|_/)
  const vid = /,|_/.test(pv) ? data[1] + plus + data[0] : data[0] + plus + data[1]
  return isMobile()
    ? `https://m.iqiyi.com/shareplay.html?vid=${vid}&coop=coop_117_9949&cid=qc_105102_300452&bd=1&autoplay=1&fullscreen=1`
    : `https://www.iqiyi.com/common/flashplayer/20181107/1549af8f6df.swf?menu=false&autoplay=true&cid=qc_100001_100100&flashP2PCoreUrl=http://www.iqiyi.com/common/flashplayer/20170406/15562a1b82aa.swf&=undefined&&definitionID=${vid}&isPurchase=0&cnId=4&coop=ugc_openapi_wanyouwang&cid=qc_100001_300089&bd=1&autoChainPlay=1&showRecommend=0&source=&purl=&autoplay=true`
}
const letv = pv => {
  const data = pv.split(',')
  return data.length === 2 ? '/' : 'https://www.le.com/ptv/vplay/' + data[0] + '.html'
}
const sohu = pv => {
  return 'https://tv.sohu.com/upload/static/share/share_play.html#' + pv.split('_')[0] + (isMobile() ? '' : '_9468532_0_9001_0')
}
const pptv = pv => {
  return 'https://' + (isMobile() ? 'm' : 'www') + '.pptv.com/show/' + pv.split(',')[0] + '.html'
}
const qq = pv => {
  return 'https://v.qq.com/iframe/player.html?vid=' + pv + '&tiny=0&auto=1'
}
const bilibili = pv => {
  const data = pv.split(',')
  return pv.indexOf('http') !== -1 ? pv : data.length === 2 ? 'https://www.bilibili.com/video/av' + data[0] + '/?p=' + data[1] : 'https://www.bilibili.com/video/av' + pv + '/'
}
const acfun = pv => {
  let vid = ''
  if (pv.indexOf('ab') !== -1) {
    const data = pv.split('ab')
    const ab = data[1].split(',')
    vid = ab.length === 2 ? ab[0] + '_' + ab[1] : data[1]
  } else {
    const data = pv.split(',')
    vid = data.length === 2 ? data[0] + '_' + data[1] : pv
  }
  return isMobile() ? 'https://m.acfun.cn/v/?' + (pv.indexOf('ab') !== -1 ? 'ab' : 'ac') + '=' + vid : 'https://www.acfun.cn/v/' + (pv.indexOf('ab') !== -1 ? 'ab' : 'ac') + vid
}

const ck = (type, pv) => {
  const flvsp = 'https://api.flvsp.com/?type='
  const mdparse = 'https://p.mdb6.cn/mdparse/?type='
  if (type === 'pptv') {
    return mdparse + type + '&id=' + pv
  } else if (type === 'sohu') {
    return isMobile() ? mdparse + type + '&id=' + pv : flvsp + type + '&id=' + pv
  } else if (type === 'yunpan') {
    return `//p.mdb6.cn/api/p.php?type=yunpan&domain=${DOMAIN}&id=${pv}`
  } else if (type === 'qqq') {
    return `//p.mdb6.cn/api/p.php?type=qqq&domain=${DOMAIN}&id=${pv}`
  } else if (type === '360') {
    return `//p.mdb6.cn/api/p.php?type=360&domain=${DOMAIN}&id=${pv}`
  } else {
    return flvsp + type + '&id=' + pv
  }
}

const jiexiUrl = (pv = '', danmu) => {
  const url = `${pv.replace('www.ikanfan.cn', 'p.mdb6.cn')}${pv.indexOf('flvsp') === -1 ? `&danmu=${danmu}` : ''}`
  return `<iframe src="${url}" width="100%" height="${playH}" frameborder="0" scrolling="no" allowfullscreen="allowfullscreen" mozallowfullscreen="mozallowfullscreen" msallowfullscreen="msallowfullscreen" oallowfullscreen="oallowfullscreen" webkitallowfullscreen="webkitallowfullscreen" id="ckplayer"></iframe>`
}

const rePlayUrl = (playname, pv) => {
  var sVid = '',
    sName = '',
    data = []
  switch (playname) {
    case 'letv':
      data = pv.split(',')
      sName = 'letv'
      sVid = data[0]
      break
    case 'sohu':
      data = pv.split('_')
      sVid = data.length === 2 ? data[0] : pv
      sName = data.length === 2 ? (isMobile() ? 'mysohu' : 'sohu') : playname
      break
    case 'pptv':
      data = pv.split(',')
      data.length === 2 ? (sVid = data[0]) : (sVid = pv)
      sName = playname
      break
    default:
      sVid = pv
      sName = playname
      break
  }
  return ck(sName, sVid)
}

const jump = (name, pv, isLogin, path) => {
  let url = ''
  switch (name) {
    case 'youku':
      url = youku(pv)
      break
    case 'tudou':
      url = tudou(pv)
      break
    case 'iqiyi':
      url = iqiyi(pv)
      break
    case 'viqiyi':
      url = iqiyi(pv)
      break
    case 'letv':
      url = letv(pv)
      break
    case 'sohu':
      url = sohu(pv)
      break
    case 'pptv':
      url = pptv(pv)
      break
    case 'qq':
      url = qq(pv)
      break
    case 'bilibili':
      url = bilibili(pv)
      break
    case 'acfun':
      url = acfun(pv)
      break
    default:
      url = jiexiUrl(ck(name, pv))
      break
  }
  return isP || /bilibili|acfun|pptv|letv/.test(name) ? HTML(url, isLogin, path) : /iqiyi/.test(name) && !isMobile() ? flash(url) : iframe(url)
}

const isPlay = (name, vid, danmu, uid, isLogin, path) => {
  const playStyle = /sina|weibo|miaopai|yunpan|qqq|360/.test(name)
  let url = ''
  if (((/.mp4|.m3u8/.test(vid) || playStyle) && isP && !uid) || ['bit', 'letvyun', 'pmbit', 'bithls', 'bitqiu', 'letvsaas', 'acku'].indexOf(name) !== -1) {
    url = HTML('/', isLogin, path)
  } else if (name === 'full') {
    url = isP ? HTML('/', isLogin, path) : jiexiUrl(vid.replace('http://', 'https://'), danmu)
  } else {
    if (/.mp4|.m3u8/.test(vid)) {
      url = isP ? HTML('/', isLogin, path) : jiexiUrl(`//p.mdb6.cn/api/p.php?type=${/.mp4/.test(vid) ? 'mp4' : 'm3u8'}&domain=${DOMAIN}&id=${vid}`, danmu)
    } else if (!/youku.com|iqiyi.com|acfun.cn|bilibili.com|qq.com|mgtv.com/.test(vid)) {
      if (/bilibili|acfun|youku|tudou|iqiyi/.test(name)) {
        url = jump(name, vid, isLogin, path)
      } else {
        url = isP ? HTML(vid, isLogin, path) : jiexiUrl(rePlayUrl(name, vid), danmu)
      }
    } else {
      url = HTML(vid, isLogin, path)
    }
  }
  return url
}

export default ({ name, vid, danmu, uid, isLogin, url }) => {
  if (vid.indexOf('@@') !== -1) {
    const data = vid.split('@@')
    name = data[1]
    vid = data[0]
  }
  return isPlay(name, vid, danmu, uid, isLogin, url)
}
