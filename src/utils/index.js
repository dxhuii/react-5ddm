export const isNumber = val => typeof val === 'number'

// 比较两个对象是否相等，用于比较form表单是否编辑过
export const isObjectEqual = (obj1, obj2) => {
  const equal = Object.is(JSON.stringify(obj1), JSON.stringify(obj2))
  return equal
}

// http 和 https 替换成 //
export const picHttps = pic => {
  if (pic.indexOf('https') === -1) {
    return pic.replace('http://', '//').replace('https://', '//')
  } else {
    return pic
  }
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

// 获取元素position的位置
export const getOffset = el => {
  let actualLeft = el.offsetLeft
  let current = el.offsetParent
  let elementScrollLeft = 0
  while (current !== null) {
    actualLeft += current.offsetLeft + current.clientLeft
    current = current.offsetParent
  }
  if (document.compatMode == 'BackCompat') {
    elementScrollLeft = document.body.scrollLeft
  } else {
    elementScrollLeft = document.documentElement.scrollLeft
  }
  return actualLeft - elementScrollLeft
}

// 去掉字符串前后空格
export const trim = str => {
  return str.replace(/(^\s*)|(\s*$)/g, '')
}
