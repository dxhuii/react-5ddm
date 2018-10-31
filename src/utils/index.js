export const isNumber = val => typeof val === 'number'

// 比较两个对象是否相等，用于比较form表单是否编辑过
export const isObjectEqual = (obj1, obj2) => {
  const equal = Object.is(JSON.stringify(obj1), JSON.stringify(obj2))
  return equal
}

// http 和 https 替换成 //
export const picHttps = (pic) => {
  return pic.replace('http://', '//').replace('https://', '//');
}

export const isMobile = () => {
  if (typeof navigator == 'undefined') {
    return
  }
  var ua = navigator.userAgent;
  var ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
      isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
      isAndroid = ua.match(/(Android)\s+([\d.]+)/),
      isMobile = isIphone || isAndroid;
  if (isMobile) {
    return true
  } else {
    return false
  }
}
