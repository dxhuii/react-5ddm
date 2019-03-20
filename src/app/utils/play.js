import { isMobile } from './index'
import { IS9, DOMAIN_NAME } from 'Config'

const isP = IS9 && !isMobile()

const playH = '100%'

const iframe = url => {
  return `<iframe src="${url}" width="100%" height="${playH}" frameborder="0" scrolling=no  allowfullscreen="allowfullscreen" mozallowfullscreen="mozallowfullscreen" msallowfullscreen="msallowfullscreen" oallowfullscreen="oallowfullscreen" webkitallowfullscreen="webkitallowfullscreen" id="ckplayer"></iframe>`
}

const HTML = (pv, isLogin) => {
  let url = ''
  const href = window.location.href.split('/')
  if (isLogin === 'vip') {
    url = 'https://www.5ddm.com/play/' + href[4] + '/' + href[5]
  } else {
    url = 'https://www.dddm.tv/play/' + href[4] + '/' + href[5]
  }
  const reUrl = DOMAIN_NAME === '5ddm.com' && isLogin === 'vip' ? '' : DOMAIN_NAME === 'dddm.tv' && isLogin !== 'vip' ? '' : `<a target="_blank" class="jump" href="${url}">或者点这里试一下</a>`
  return `<div class="explaywrap" style="height:${playH};"><a target="_blank" href="${pv}">亲，请点我播放</a>${reUrl}<p>该视频需要跳转播放<br>请点击上⾯的按钮哦</p></div>`
}

const flash = url => {
  return `<embed src="${url}" width="100%" height="${playH}" bgcolor="#000000" quality="high" allowfullscreen="true" allowscriptaccess="always" id="ckplayer">`
}

const ykUrl = data => {
  return 'https://v.youku.com/v_show/id_' + data + '.html'
}

const ykIf = data => {
  return '//player.youku.com/embed/' + data + '?client_id=08fa721d0f5abf37'
}

const tudou = (pv, isLogin) => {
  const data = pv.split(',')
  const len = data.length
  if (len === 1) {
    youku(pv)
  } else if (len === 2) {
    return HTML('/', isLogin)
  } else if (len >= 3) {
    youku(data[2])
  }
}
const youku = (pv, isLogin) => {
  const data = pv.split(',')
  return isP ? HTML(ykUrl(data.length === 3 ? data[2] : pv), isLogin) : iframe(ykIf(data.length === 3 ? data[2] : pv))
}
const iqiyi = (pv, isLogin) => {
  let plus = isMobile() ? '&tvid=' : '&tvId='
  let data = []
  let purl = ''
  let vid = ''
  if (pv.indexOf(',') > 0) {
    data = pv.split(',')
    vid = data[1] + plus + data[0]
  } else if (pv.indexOf('&tvid=') > 0) {
    data = pv.split('&tvid=')
    vid = data[0] + plus + data[1]
  } else if (pv.indexOf('_') > 0) {
    data = pv.split('_')
    vid = data[1] + plus + data[0]
  }
  // 5edbc91ba157d0acdb1f3a036959f2b0&tvId=1952779500
  if (isMobile()) {
    purl = 'https://m.iqiyi.com/shareplay.html?vid=' + vid + '&coop=coop_117_9949&cid=qc_105102_300452&bd=1&autoplay=1&fullscreen=1'
  } else {
    purl = `https://www.iqiyi.com/common/flashplayer/20181107/1549af8f6df.swf?menu=false&autoplay=true&cid=qc_100001_100100&flashP2PCoreUrl=http://www.iqiyi.com/common/flashplayer/20170406/15562a1b82aa.swf&=undefined&&definitionID=${vid}&isPurchase=0&cnId=4&coop=ugc_openapi_wanyouwang&cid=qc_100001_300089&bd=1&autoChainPlay=1&showRecommend=0&source=&purl=&autoplay=true` //'https://open.iqiyi.com/developer/player_js/coopPlayerIndex.html?vid=' + vid
  }
  return isP ? HTML(purl, isLogin) : isMobile() ? iframe(purl) : flash(purl)
}
const letv = (pv, isLogin) => {
  const data = pv.split(',')
  const len = data.length
  const purl = len === 2 ? '/' : 'https://www.le.com/ptv/vplay/' + data[0] + '.html'
  return HTML(purl, isLogin)
}
const sohu = (pv, isLogin) => {
  const purl = 'https://tv.sohu.com/upload/static/share/share_play.html#' + pv.split('_')[0] + (isMobile() ? '' : '_9468532_0_9001_0')
  return isP ? HTML(purl, isLogin) : iframe(purl)
}
const pptv = (pv, isLogin) => {
  const purl = 'https://' + (isMobile() ? 'm' : 'www') + '.pptv.com/show/' + pv.split(',')[0] + '.html'
  return HTML(purl, isLogin)
}
const qq = (pv, isLogin) => {
  const purl = 'https://v.qq.com/iframe/player.html?vid=' + pv + '&tiny=0&auto=1'
  return isP ? HTML(purl, isLogin) : iframe(purl)
}
const bilibili = (pv, isLogin) => {
  const data = pv.split(',')
  const purl =
    pv.indexOf('http') !== -1 ? pv : data.length === 2 ? 'https://www.bilibili.com/video/av' + data[0] + '/?p=' + data[1] : 'https://www.bilibili.com/video/av' + pv + '/'
  return HTML(purl, isLogin)
}
const acfun = (pv, isLogin) => {
  let vid = ''
  let data = []
  if (pv.indexOf('ab') !== -1) {
    data = pv.split('ab')
    const ab = data[1].split(',')
    if (ab.length === 2) {
      vid = ab[0] + '_' + ab[1]
    } else {
      vid = data[1]
    }
  } else {
    data = pv.split(',')
    const len = data.length
    if (len === 2) {
      vid = data[0] + '_' + data[1]
    } else {
      vid = pv
    }
  }
  const purl = isMobile()
    ? 'https://m.acfun.cn/v/?' + (pv.indexOf('ab') !== -1 ? 'ab' : 'ac') + '=' + vid
    : 'https://www.acfun.cn/v/' + (pv.indexOf('ab') !== -1 ? 'ab' : 'ac') + vid
  return HTML(purl, isLogin)
}

const ck = (type, pv) => {
  const flvsp = 'https://api.flvsp.com/?type='
  // const mdparse = 'https://www.acgnz.cn/mdparse/?type='
  // if (type === 'pptv') {
  //   return mdparse + type + '&id=' + pv
  // } else if (type === 'sohu') {
  //   return isMobile() ? mdparse + type + '&id=' + pv : flvsp + type + '&id=' + pv
  // } else
  if (type === 'bitqiu') {
    return '//www.acgnz.cn/api/pan.php?url=vbit?v=' + pv
  } else if (type === 'yunpan') {
    return '//www.acgnz.cn/api/pan.php?url=va360?v=' + pv
  } else if (type === 'bithls') {
    return '//www.acgnz.cn/api/pan.php?url=vbithls?v=' + pv
  } else if (type === 'bit') {
    return '//www.acgnz.cn/api/bit.php?id=' + pv
  } else if (type === 'qqq') {
    return '//www.acgnz.cn/api/qqquan.php?id=' + pv
  } else {
    return flvsp + type + '&id=' + pv
  }
}

const jiexiUrl = (pv, danmu) => {
  const url = `${pv.replace('ikanfan.cn', 'acgnz.cn')}${pv.indexOf('flvsp') === -1 ? `&danmu=${danmu}` : ''}`
  return `<iframe src="${url}" width="100%" height="${playH}" frameborder="0" scrolling="no" allowfullscreen="allowfullscreen" mozallowfullscreen="mozallowfullscreen" msallowfullscreen="msallowfullscreen" oallowfullscreen="oallowfullscreen" webkitallowfullscreen="webkitallowfullscreen" id="ckplayer"></iframe>`
}

const rePlayUrl = (playname, pv) => {
  var sVid = '',
    sName = '',
    data = []
  if (pv.indexOf('@@') !== -1) {
    data = pv.split('@@')
    playname = data[1]
    pv = data[0]
  }
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

const jump = (name, pv, danmu, isLogin) => {
  let url = ''
  switch (name) {
    case 'youku':
      url = youku(pv, isLogin)
      break
    case 'tudou':
      url = tudou(pv, isLogin)
      break
    case 'iqiyi':
      url = iqiyi(pv, isLogin)
      break
    case 'viqiyi':
      url = iqiyi(pv, isLogin)
      break
    case 'letv':
      url = letv(pv, isLogin)
      break
    case 'sohu':
      url = sohu(pv, isLogin)
      break
    case 'pptv':
      url = pptv(pv, isLogin)
      break
    case 'qq':
      url = qq(pv, isLogin)
      break
    case 'bilibili':
      url = bilibili(pv, isLogin)
      break
    case 'acfun':
      url = acfun(pv, isLogin)
      break
    default:
      url = jiexiUrl(ck(name, pv), danmu)
      break
  }
  return url
}

const isPlay = (name, vid, danmu, isLogin) => {
  let playname = name
  let data = []
  let pv = vid
  if (pv.indexOf('@@') !== -1) {
    data = pv.split('@@')
    playname = data[1]
    pv = data[0]
  }
  if (playname === 'full') {
    return isP ? HTML('/', isLogin) : jiexiUrl(pv.replace('http://', 'https://'), danmu)
  } else {
    if (/.mp4|.m3u8/.test(pv)) {
      return isP ? HTML('/', isLogin) : jiexiUrl(`//www.acgnz.cn/api/play.php?url=${pv}`, danmu)
    } else if (!/youku.com|iqiyi.com|acfun.cn|bilibili.com|qq.com|mgtv.com/.test(pv)) {
      if (/bilibili|acfun|youku|tudou|iqiyi/.test(playname)) {
        return jump(playname, pv, danmu, isLogin)
      } else {
        return isP ? HTML(pv, isLogin) : jiexiUrl(rePlayUrl(playname, pv), danmu)
      }
    } else {
      return HTML(pv, isLogin)
    }
  }
}

export default (playname, vid, danmu, uid, isLogin) => {
  let url = ''
  let name = playname
  let data = []
  let pv = vid
  if (pv.indexOf('@@') !== -1) {
    data = pv.split('@@')
    name = data[1]
    pv = data[0]
  }
  const isCk = /.html|.shtml|.htm|https:\/\/|http:\/\/|.mp4|.m3u8/.test(pv) || name === 'full' || !isP
  const playStyle = /acku|sina|letvsaas|weibo|miaopai|bitqiu|yunpan|bithls|qqq/.test(name)
  if (((/.mp4|.m3u8/.test(pv) || playStyle) && isP && !uid) || ['bit', 'letvyun', 'pmbit'].indexOf(name) !== -1) {
    url = HTML('/', isLogin)
  } else if (isCk) {
    url = isPlay(name, vid, danmu, isLogin)
  } else {
    url = jump(name, vid, danmu, isLogin)
  }
  return url
}
