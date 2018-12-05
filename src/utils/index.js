export const isNumber = val => typeof val === 'number'

// 比较两个对象是否相等，用于比较form表单是否编辑过
export const isObjectEqual = (obj1, obj2) => {
  const equal = Object.is(JSON.stringify(obj1), JSON.stringify(obj2))
  return equal
}

// http 和 https 替换成 //
export const picHttps = pic => {
  return pic.replace('http://', '//').replace('https://', '//')
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
  var _x = 0
  var _y = 0
  while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
    _x += el.offsetLeft - el.scrollLeft
    _y += el.offsetTop - el.scrollTop
    el = el.offsetParent
  }
  return { top: _y, left: _x }
}

// 去掉字符串前后空格
export const trim = str => {
  return str.replace(/(^\s*)|(\s*$)/g, '')
}
