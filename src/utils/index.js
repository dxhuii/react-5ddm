export const isNumber = val => typeof val === 'number'

/**
 * @type
 * thumb150 宽高为 150 正方形
 * orj360 宽为360
 * thumb300 宽高为 300 正方形
 */

export const formatPic = (pic, type) => {
  const rePic = pic.replace('http://', '//').replace('https://', '//')
  return rePic.replace(/large|mw1024/, type)
}

export const isMobile = () => {
  if (typeof navigator === 'undefined') {
    return
  }
  const ua = navigator.userAgent
  const ipad = ua.match(/(iPad).*OS\s([\d_]+)/)
  const isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/)
  const isAndroid = ua.match(/(Android)\s+([\d.]+)/)
  const isMobile = isIphone || isAndroid
  if (isMobile) {
    return true
  } else {
    return false
  }
}

export const location = () => {
  if (typeof window === 'undefined') {
    return {}
  }
  return window.location
}

// 去掉字符串前后空格
export const trim = str => {
  return str.replace(/(^\s*)|(\s*$)/g, '')
}
