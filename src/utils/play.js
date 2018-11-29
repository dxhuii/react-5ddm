import { isMobile, location } from './index'

const is9 = (location.host || '').indexOf('99496.com') !== -1 && !isMobile()

const ykUrl = data => {
  return 'https://v.youku.com/v_show/id_' + data + '.html'
}

const ykIf = data => {
  return '//player.youku.com/embed/' + data + '?client_id=08fa721d0f5abf37'
}

const tudou = (pv, isP) => {
  const data = pv.split(',')
  const len = data.length
  if (len === 1) {
    youku(pv, isP)
  } else if (len === 2) {
    return isP ? HTML('/') : '/'
  } else if (len >= 3) {
    youku(data[2], isP)
  }
}
const youku = (pv, isP) => {
  const data = pv.split(',')
  return is9
    ? HTML(ykUrl(data.length === 3 ? data[2] : pv))
    : isP
    ? iframe(ykIf(data.length === 3 ? data[2] : pv))
    : ykUrl(data.length === 3 ? data[2] : pv)
}
const iqiyi = (pv, isP) => {
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
  if (isMobile()) {
    purl = 'https://m.iqiyi.com/shareplay.html?vid=' + vid + '&coop=coop_117_9949&cid=qc_105102_300452&bd=1&autoplay=1&fullscreen=1'
  } else {
    purl = 'https://open.iqiyi.com/developer/player_js/coopPlayerIndex.html?vid=' + vid
  }
  return is9 ? HTML(purl) : isP ? iframe(purl) : purl
}
const letv = (pv, isP) => {
  const data = pv.split(',')
  const len = data.length
  const purl = len === 2 ? '/' : 'https://www.le.com/ptv/vplay/' + data[0] + '.html'
  return isP ? HTML(purl) : purl
}
const sohu = (pv, isP) => {
  const purl = 'https://tv.sohu.com/upload/static/share/share_play.html#' + pv.split('_')[0] + (isMobile() ? '' : '_9468532_0_9001_0')
  return is9 ? HTML(purl) : isP ? iframe(purl) : purl
}
const pptv = (pv, isP) => {
  const purl = 'https://' + (isMobile() ? 'm' : 'www') + '.pptv.com/show/' + pv.split(',')[0] + '.html'
  return isP ? HTML(purl) : purl
}
const qq = (pv, isP) => {
  const purl = 'https://v.qq.com/iframe/player.html?vid=' + pv + '&tiny=0&auto=1'
  return is9 ? HTML(purl) : isP ? iframe(purl) : purl
}
const bilibili = (pv, isP) => {
  const data = pv.split(',')
  const purl =
    pv.indexOf('http') !== -1
      ? pv
      : data.length === 2
      ? 'https://www.bilibili.com/video/av' + data[0] + '/?p=' + data[1]
      : 'https://www.bilibili.com/video/av' + pv + '/'
  return isP ? HTML(purl) : purl
}
const acfun = (pv, isP) => {
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
  return isP ? HTML(purl) : purl
}

const isPlay = (type, pv) => {
  if (type === 'full') {
    return pv.replace('http://', 'https://')
  } else {
    if (pv.indexOf('.mp4') !== -1 || pv.indexOf('.m3u8') !== -1) {
      return '//www.acgnz.cn/api/play.php?url=' + pv
    } else {
      return pv
    }
  }
}

const ck = (type, pv) => {
  const flvsp = 'https://api.flvsp.com/?type='
  if (type === 'bitqiu') {
    return '//www.acgnz.cn/api/pan.php?url=http://193.112.131.234:8081/play/vbit?v=' + pv
  } else if (type === 'yunpan') {
    return '//www.acgnz.cn/api/pan.php?url=http://193.112.131.234:8081/play/va360?v=' + pv
  } else if (type === 'maoyun') {
    return 'https://mao.shuikaile.com/play.php?url=' + pv
  } else {
    return flvsp + type + '&id=' + pv
  }
}

const jiexiUrl = pv => {
  const style = isMobile() ? 'class="playheight" style="height: 320px;width:100%;"' : 'width="100%" height="495"'
  return (
    '<iframe src="' +
    pv.replace('ikanfan.cn', 'acgnz.cn') +
    '" ' +
    style +
    ' frameborder="0" scrolling="no" allowfullscreen="allowfullscreen" mozallowfullscreen="mozallowfullscreen" msallowfullscreen="msallowfullscreen" oallowfullscreen="oallowfullscreen" webkitallowfullscreen="webkitallowfullscreen" id="ckplayer"></iframe>'
  )
}
const iframe = pv => {
  const style = isMobile() ? 'class="playheight" style="height: 320px;width:100%;"' : 'width="100%" height="495"'
  return (
    '<iframe src="' +
    pv +
    '" ' +
    style +
    ' frameborder="0" scrolling=no  allowfullscreen="allowfullscreen" mozallowfullscreen="mozallowfullscreen" msallowfullscreen="msallowfullscreen" oallowfullscreen="oallowfullscreen" webkitallowfullscreen="webkitallowfullscreen" id="ckplayer"></iframe>'
  )
}
const HTML = pv => {
  const mobile = '<a class="html" href="' + pv + '">亲，请点我播放</a>'
  return isMobile()
    ? mobile
    : '<div class="explaywrap" style="height:495px;"><a target="_blank" href="' +
        pv +
        '">亲，请点我播放</a><p>该视频需要跳转播放<br>请点击上⾯的按钮哦</p></div>'
}
const isPlays = (playname, pv) => {
  if (playname === 'full') {
    return is9 ? '/' : jiexiUrl(pv.replace('http://', 'https://'))
  } else {
    if (pv.indexOf('.mp4') !== -1 || pv.indexOf('.m3u8') !== -1) {
      return is9 ? '/' : jiexiUrl('//www.acgnz.cn/api/play.php?url=' + pv)
    } else if (
      pv.indexOf('youku.com') === -1 &&
      pv.indexOf('iqiyi.com') === -1 &&
      pv.indexOf('acfun.cn') === -1 &&
      pv.indexOf('bilibili.com') === -1 &&
      pv.indexOf('qq.com') === -1 &&
      pv.indexOf('mgtv.com') === -1
    ) {
      return is9 ? HTML(pv) : jiexiUrl('//www.acgnz.cn/mdparse/?id=' + pv)
    } else {
      return HTML(pv)
    }
  }
}

export default {
  isJump: (vid, playname, isP) => {
    let url = ''
    let name = playname
    let data = []
    let pv = vid
    if (pv.indexOf('@@') !== -1) {
      data = pv.split('@@')
      name = data[1]
      pv = data[0]
    }
    const isCk =
      vid.indexOf('.html') !== -1 ||
      vid.indexOf('.shtml') !== -1 ||
      vid.indexOf('.htm') !== -1 ||
      vid.indexOf('https://') !== -1 ||
      vid.indexOf('http://') !== -1 ||
      vid.indexOf('.mp4') !== -1 ||
      vid.indexOf('.m3u8') !== -1 ||
      name === 'full'
    const playStyle = ['acku', 'sina', 'letvsaas', 'weibo', 'miaopai', 'tudou', 'letvyun', 'bitqiu', 'yunpan'].indexOf(playname) !== -1
    if ((pv.indexOf('.mp4') !== -1 || pv.indexOf('.m3u8') !== -1 || playStyle) && is9) {
      url = HTML('/')
    } else if (isCk) {
      url = isP ? isPlays(name, vid) : isPlay(name, vid)
    } else {
      switch (name) {
        case 'youku':
          url = youku(pv, isP)
          break
        case 'tudou':
          url = tudou(pv, isP)
          break
        case 'iqiyi':
          url = iqiyi(pv, isP)
          break
        case 'viqiyi':
          url = iqiyi(pv, isP)
          break
        case 'letv':
          url = letv(pv, isP)
          break
        case 'sohu':
          url = sohu(pv, isP)
          break
        case 'pptv':
          url = pptv(pv, isP)
          break
        case 'qq':
          url = qq(pv, isP)
          break
        case 'bilibili':
          url = bilibili(pv, isP)
          break
        case 'acfun':
          url = acfun(pv, isP)
          break
        default:
          url = isP ? jiexiUrl(ck(name, pv)) : ck(name, pv)
          break
      }
    }
    return url
  },
  is9
}
