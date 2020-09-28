export const isNumber = val => typeof val === 'number'

/**
 * @type
 * thumb150 宽高为 150 正方形
 * orj360 宽为360
 * thumb300 宽高为 300 正方形
 */

export const formatPic = (pic = '', type = '') => {
  const rePic = pic.replace('http://', '//').replace('https://', '//')
  if (/.gif/.test(pic)) return pic
  return rePic.replace(/large|mw1024/, type)
}

export const isMobile = () => {
  if (!(typeof navigator === 'undefined')) {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  }
}

// 去掉字符串前后空格
export const trim = (str = '') => {
  return str.trim() // replace(/(^\s*)|(\s*$)/g, '')
}

// 提取字符串第一次出现的数字
export const firstNumber = str => {
  const isN = /pv|PV|SP|sp|全集|总集/.exec(str) || []
  if (isN.index === 0) {
    return str
  } else {
    const reg = /\d+/g
    const arr = str.match(reg)
    if (arr) {
      return arr[0]
    } else {
      return str
    }
  }
}

export const format = data => {
  let num = ''
  let subName = ''
  if (/全集|全片|ova|OVA|OAD|oad|日语|国语|普通话|总集|pv|PV|SP|sp/.test(data)) {
    num = data
  } else {
    const title = data.split(' ')
    const name = data.split(/话|集/)
    num = title[0]
    subName = name[1] ? trim(name[1]) : ''
  }
  return [num, subName]
}

export const getName = vid => {
  let name = ''
  let playName = ''
  if (vid.indexOf('youku.com') !== -1) {
    playName = 'youku'
    name = '优酷视频'
  } else if (vid.indexOf('qq.com') !== -1) {
    playName = 'qq'
    name = '腾讯视频'
  } else if (vid.indexOf('bilibili.com') !== -1) {
    playName = 'bilibili'
    name = '哔哩哔哩'
  } else if (vid.indexOf('iqiyi.com') !== -1) {
    playName = 'iqiyi'
    name = '爱奇艺视频'
  } else if (vid.indexOf('mgtv.com') !== -1) {
    playName = 'mgtv'
    name = '芒果TV'
  } else if (vid.indexOf('acfun.cn') !== -1) {
    playName = 'acfun'
    name = 'A站 AcFun'
  } else if (vid.indexOf('sohu.com') !== -1) {
    playName = 'sohu'
    name = '搜狐视频'
  } else if (vid.indexOf('le.com') !== -1 || vid.indexOf('letv.com') !== -1) {
    playName = 'letv'
    name = '乐视视频'
  } else if (vid.indexOf('pptv.com') !== -1) {
    playName = 'pptv'
    name = '聚力视频'
  } else if (vid.indexOf('migu.cn') !== -1 || vid.indexOf('miguvideo.com') !== -1) {
    playName = 'migu'
    name = '咪咕视频'
  } else if (vid.indexOf('1905.com') !== -1) {
    playName = 'm1905'
    name = '1905电影网'
  } else if (vid.indexOf('ixigua.com') !== -1) {
    playName = 'ixigua'
    name = '西瓜视频'
  } else if (vid.indexOf('huanxi.com') !== -1) {
    playName = 'huanxi'
    name = '欢喜首映'
  } else if (vid.indexOf('moegirl.org') !== -1) {
    playName = 'moegirl'
    name = '萌娘百科'
  }

  return [name, playName]
}
