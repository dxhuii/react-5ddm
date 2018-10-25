export const isNumber = val => typeof val === 'number';

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
