import { isMobile } from './index'

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
  return `https://v.youku.com/v_show/id_${data.length === 3 ? data[2] : pv}.html`
}
const iqiyi = pv => {
  const plus = isMobile() ? '&tvid=' : '&tvId='
  const data = pv.split(/,|&tvid=|_/)
  const vid = /,|_/.test(pv) ? data[1] + plus + data[0] : data[0] + plus + data[1]
  return data.length > 1 ? `https://m.iqiyi.com/shareplay.html?vid=${vid}&autoplay=1&fullscreen=1` : '/'
}
const letv = pv => {
  const data = pv.split(',')
  return data.length === 2 ? '/' : 'https://www.le.com/ptv/vplay/' + data[0] + '.html'
}
const sohu = pv => {
  return `https://tv.sohu.com/s/sohuplayer/iplay.html?vid=${pv.split('_')[0]}&autoplay=true`
}
const pptv = pv => {
  return 'https://' + (isMobile() ? 'm' : 'www') + '.pptv.com/show/' + pv.split(',')[0] + '.html'
}
const qq = pv => {
  return `https://v.qq.com/txp/iframe/player.html?vid=${pv}`
}
const bilibili = pv => {
  const data = pv.split(',')
  return pv.indexOf('http') !== -1
    ? pv
    : data.length === 2
    ? 'https://www.bilibili.com/video/av' + data[0] + '/?p=' + data[1]
    : 'https://www.bilibili.com/video/av' + pv + '/'
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
  return isMobile()
    ? 'https://m.acfun.cn/v/?' + (pv.indexOf('ab') !== -1 ? 'ab' : 'ac') + '=' + vid
    : 'https://www.acfun.cn/v/' + (pv.indexOf('ab') !== -1 ? 'ab' : 'ac') + vid
}

const jump = (name, pv) => {
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
      url = '/'
      break
  }
  return url
}

const isPlay = (name, vid) => {
  let url = ''
  if (/sina|weibo|miaopai|bit|letvyun|pmbit|bithls|bitqiu|letvsaas|acku|yunpan|s360|ksyun|360|qqq/.test(name)) {
    url = '/'
  } else if (/ikanfan|acgnz/.test(vid)) {
    url = vid.split('=')[1].split('&')[0]
  } else if (/.mp4|.m3u8/.test(vid)) {
    url = '/'
  } else if (/.html|.shtml|.htm|https:\/\/|http:\/\//.test(vid) || name === 'full') {
    url = vid
  } else if (/bilibili|acfun|youku|tudou|iqiyi|pptv|letv|qq|sohu|viqiyi/.test(name)) {
    url = jump(name, vid)
  } else {
    url = vid
  }
  return url
}

export default (name, vid) => {
  if (vid.indexOf('@@') !== -1) {
    const data = vid.split('@@')
    name = data[1]
    vid = data[0]
  }
  return isPlay(name, vid)
}
