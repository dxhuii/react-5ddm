import {
  isMobile
} from './index'

const ykUrl = (data) => {
  return 'https://v.youku.com/v_show/id_' + data + '.html';
}

const tudou = (pv) => {
  const data = pv.split(',');
  const len = data.length;
  if (len === 1) {
    youku(pv);
  } else if (len === 2) {
    return '/'
  } else if (len >= 3) {
    youku(data[2]);
  }
}
const youku = (pv) => {
  const data = pv.split(',');
  return ykUrl(data.length === 3 ? data[2] : pv)
}
const iqiyi = (pv) => {
  let plus = isMobile() ? '&tvid=' : '&tvId=',
    data = [],
    purl = '',
    vid = ''
  if (pv.indexOf(",") > 0) {
    data = pv.split(',');
    vid = data[1] + plus + data[0];
  } else if (pv.indexOf("&tvid=") > 0) {
    data = pv.split('&tvid=');
    vid = data[0] + plus + data[1];
  } else if (pv.indexOf("_") > 0) {
    data = pv.split('_');
    vid = data[1] + plus + data[0];
  }
  if (isMobile()) {
    purl = 'https://m.iqiyi.com/shareplay.html?vid=' + vid + '&coop=coop_117_9949&cid=qc_105102_300452&bd=1&autoplay=1&fullscreen=1';
  } else {
    purl = 'https://open.iqiyi.com/developer/player_js/coopPlayerIndex.html?vid=' + vid;
  }
  return purl
}
const letv = (pv) => {
  const data = pv.split(',');
  const len = data.length;
  return len === 2 ? '/' : 'https://www.le.com/ptv/vplay/' + data[0] + '.html'
}
const sohu = (pv) => {
  return 'https://tv.sohu.com/upload/static/share/share_play.html#' + pv.split('_')[0] + (isMobile() ? '' : '_9468532_0_9001_0')
}
const pptv = (pv) => {
  return 'https://' + (isMobile() ? 'm' : 'www') + '.pptv.com/show/' + pv.split(',')[0] + '.html'
}
const qq = (pv) => {
  return 'https://v.qq.com/iframe/player.html?vid=' + pv + '&tiny=0&auto=1'
}
const bilibili = (pv) => {
  const data = pv.split(',');
  return pv.indexOf('http') !== -1 ? pv : (data.length === 2 ? 'https://www.bilibili.com/video/av' + data[0] + '/?p=' + data[1] : 'https://www.bilibili.com/video/av' + pv + '/')
}
const acfun = (pv) => {
  let vid = '', data = []
  if (pv.indexOf('ab') != -1) {
    data = pv.split('ab');
    const ab = data[1].split(',')
    if (ab.length === 2) {
      vid = ab[0] + '_' + ab[1];
    } else {
      vid = data[1];
    }
  } else {
    data = pv.split(',');
    const len = data.length;
    if (len == 2) {
      vid = data[0] + '_' + data[1];
    } else {
      vid = pv;
    }
  }
  return isMobile() ? 'https://m.acfun.cn/v/?' + (pv.indexOf('ab') != -1 ? 'ab' : 'ac') + '=' + vid : 'https://www.acfun.cn/v/' + (pv.indexOf('ab') != -1 ? 'ab' : 'ac') + vid
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

const ck = (type, vid ) => {
  const flvsp = 'https://api.flvsp.com/?type=';
  if ( type === 'bitqiu' ) {
    return '//www.acgnz.cn/api/pan.php?url=http://193.112.131.234:8081/play/vbit?v=' + vid
  } else if ( type === 'yunpan' ) {
    return '//www.acgnz.cn/api/pan.php?url=http://193.112.131.234:8081/play/va360?v=' + vid
  } else if(type === 'maoyun'){
    return 'https://mao.shuikaile.com/play.php?url=' + vid
  } else {
    return flvsp + type +'&id=' + vid;
  }
}

export default {
  isJump: (vid, playname) => {
    let url = '',
      name = playname,
      data = [],
      pv = vid
    if (pv.indexOf('@@') !== -1) {
      data = pv.split('@@');
      name = data[1];
      pv = data[0];
    }
    const isCk = vid.indexOf('.html') !== -1 || vid.indexOf('.shtml') !== -1 || vid.indexOf('.htm') !== -1 || vid.indexOf('https://') !== -1 || vid.indexOf('http://') !== -1 || vid.indexOf('.mp4') !== -1 || vid.indexOf('.m3u8') !== -1 || name === 'full'
    if (isCk) {
      url = isPlay(name, vid)
    } else {
      switch (name) {
        case 'youku':
          url = youku(pv);
          break;
        case 'tudou':
          url = tudou(pv);
          break;
        case 'iqiyi':
          url = iqiyi(pv);
          break;
        case 'viqiyi':
          url = iqiyi(pv);
          break;
        case 'letv':
          url = letv(pv);
          break;
        case 'sohu':
          url = sohu(pv);
          break;
        case 'pptv':
          url = pptv(pv);
          break;
        case 'qq':
          url = qq(pv);
          break;
        case 'bilibili':
          url = bilibili(pv);
          break;
        case 'acfun':
          url = acfun(pv);
          break;
        default:
          url = ck(name, pv)
          break
      }
    }
    return url
  }
}
