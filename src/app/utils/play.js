import { isMobile } from './index'
import { DOMAIN_NAME, DOMAIN, ISPLAY } from 'Config'

const playUrl = '//p.mdb6.com/api/p.php?type='
const playH = '100%'

const iframe = url => {
  return `<iframe src="${url}" width="100%" height="${playH}" frameborder="0" scrolling=no  allowfullscreen="allowfullscreen" mozallowfullscreen="mozallowfullscreen" msallowfullscreen="msallowfullscreen" oallowfullscreen="oallowfullscreen" webkitallowfullscreen="webkitallowfullscreen" id="ckplayer"></iframe>`
}

const HTML = (pv, copyright, path) => {
  const isJump = /zb|vip/.test(copyright)
  const url = isJump ? `https://www.kanfan.net${path}` : `https://www.dddm.tv${path}`
  const reUrl = (DOMAIN_NAME === 'kanfan.net' && isJump) || (DOMAIN_NAME === 'dddm.tv' && !isJump) ? '' : `<a target="_blank" class="jump" href="${url}">或者点这里试一下</a>`
  const tipsTxt = pv === '/' ? '资源失效，返回首页' : '亲，请点我播放'
  return `<div class="explaywrap" style="height:${playH};"><a target="_blank" href="${pv}">${tipsTxt}</a>${reUrl}<p>该视频需要跳转播放<br>请点击上⾯的按钮哦</p></div>`
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
  const url = [
    `//open.iqiyi.com/developer/player_js/coopPlayerIndex.html?vid=${vid}&accessToken=2.f22860a2479ad60d8da7697274de9346&appKey=3955c3425820435e86d0f4cdfe56f5e7&appId=1368&height=100%&width=100%`,
    `https://www.iqiyi.com/common/flashplayer/20181107/1549af8f6df.swf?menu=false&autoplay=true&cid=qc_100001_100100&flashP2PCoreUrl=http://www.iqiyi.com/common/flashplayer/20170406/15562a1b82aa.swf&=undefined&&definitionID=${vid}&isPurchase=0&cnId=4&coop=ugc_openapi_wanyouwang&cid=qc_100001_300089&bd=1&autoChainPlay=1&showRecommend=0&source=&purl=&autoplay=true`
  ]
  return isMobile() ? `https://m.iqiyi.com/shareplay.html?vid=${vid}&coop=coop_117_9949&cid=qc_105102_300452&bd=1&autoplay=1&fullscreen=1` : url
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
  if (type === 'qqq' || type === '360') {
    return `${playUrl}${type}&domain=${DOMAIN}&id=${pv}`
  } else if (type === 'youku') {
    const vid = `https://v.youku.com/v_show/id_${pv}.html`
    return `${playUrl}${type}&domain=${DOMAIN}&id=${vid}`
  } else if (type === 'iqiyi') {
    const data = pv.split(/,|&tvid=|_/)
    const vid = /,|_/.test(pv) ? data[0] : data[1]
    return `${playUrl}${type}&domain=${DOMAIN}&id=${vid}`
  } else {
    return flvsp + type + '&id=' + pv
  }
}

const jiexiUrl = (pv = '', danmu) => {
  const url = `${pv.replace('www.ikanfan.cn', 'p.mdb6.com')}${pv.indexOf('flvsp') === -1 ? `&danmu=${danmu}` : ''}`
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

const jump = (name, pv, copyright, path, area) => {
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
  return (/vip|zb/.test(copyright) && !ISPLAY && area) || /bilibili|acfun|pptv|letv/.test(name)
    ? HTML(/iqiyi/.test(name) ? url[0] : url, copyright, path)
    : /iqiyi/.test(name) && !isMobile()
    ? flash(url[1])
    : iframe(url)
}

const isPlay = (name, vid, danmu, copyright, path, area) => {
  let url = ''
  let isFlvsp = false
  if (/sina|weibo|miaopai|bit|letvyun|pmbit|bithls|bitqiu|letvsaas|acku|yunpan|s360|ksyun/.test(name)) {
    url = HTML('/', copyright, path)
  } else if (/ikanfan|acgnz/.test(vid)) {
    url = HTML(vid.split('=')[1].split('&')[0], copyright, path)
  } else if (/.mp4|.m3u8/.test(vid)) {
    url = jiexiUrl(`${playUrl}${/.mp4/.test(vid) ? 'mp4' : 'm3u8'}&domain=${DOMAIN}&id=${vid}`, danmu)
  } else if (/360|qqq/.test(name)) {
    url = jiexiUrl(ck(name, vid), danmu)
  } else if (/.html|.shtml|.htm|https:\/\/|http:\/\//.test(vid) || name === 'full') {
    url = HTML(vid, copyright, path)
  } else if (/bilibili|acfun|youku|tudou|iqiyi|pptv|letv|qq|sohu|viqiyi/.test(name)) {
    if (/bilibili|acfun|youku|tudou|iqiyi/.test(name)) {
      if ((isMobile() && name === 'iqiyi') || name === 'youku') {
        url = jiexiUrl(ck(name, vid), danmu)
      } else {
        url = jump(name, vid, copyright, path, area)
      }
    } else if (!/vip|zb/.test(copyright)) {
      url = jiexiUrl(rePlayUrl(name, vid), danmu)
      isFlvsp = true
    } else {
      url = HTML(vid, copyright, path)
    }
  } else {
    url = HTML(vid, copyright, path)
  }
  return [url, isFlvsp]
}

export default ({ name, vid, danmu, copyright, url, area }) => {
  if (vid.indexOf('@@') !== -1) {
    const data = vid.split('@@')
    name = data[1]
    vid = data[0]
  }
  return isPlay(name, vid, danmu, copyright, url, area)
}
