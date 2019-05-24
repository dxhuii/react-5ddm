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
export const trim = str => {
  return str.replace(/(^\s*)|(\s*$)/g, '')
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

// 动态加载JS
export const loadScript = ({ src, end, dom, callback }) => {
  if (!(typeof document === 'undefined')) {
    const script = document.createElement('script'),
      head = document.getElementsByTagName('head')[0],
      body = document.getElementsByTagName('body')[0],
      scriptDom = document.getElementsByTagName('script')
    script.src = src
    script.async = 1
    for (let i = 0; i < scriptDom.length; i++) {
      const url = /http:|https:/.test(src) ? src : window.location.protocol + src
      if (scriptDom[i].src === url) {
        scriptDom[i].parentNode.removeChild(scriptDom[i])
      }
    }
    if (script.addEventListener) {
      script.addEventListener(
        'load',
        function() {
          callback && callback()
        },
        false
      )
    } else if (script.attachEvent) {
      script.attachEvent('onreadystatechange', function() {
        const target = window.event.srcElement
        if (target.readyState === 'loaded') {
          callback && callback()
        }
      })
    }
    if (dom) {
      dom.appendChild(script)
    } else {
      end ? body.appendChild(script) : head.appendChild(script)
    }
  }
}

/**
 * 销毁iframe，释放iframe所占用的内存。
 * @param iframe 须要销毁的iframe对象
 */
const destroyIframe = iframe => {
  // 把iframe指向空白页面，这样能够释放大部分内存。
  iframe.src = 'about:blank'
  try {
    iframe.contentWindow.document.write('')
    iframe.contentWindow.document.clear()
    iframe.contentWindow.close() // 避免iframe内存泄漏
  } catch (e) {
    console.log(e)
  }
  //把iframe从页面移除
  iframe.parentNode.removeChild(iframe)
}

/**
 * 动态创建iframe
 * @param dom 创建iframe的容器，即在dom中创建iframe。dom能够是div、span或者其它标签。
 * @param src iframe中打开的网页路径
 * @param onload iframe载入完后触发该事件。能够为空
 * @return 返回创建的iframe对象
 */
export const createIframe = (dom, src, height = 90, onload) => {
  const iframeDom = document.getElementsByTagName('iframe')
  for (let i = 0; i < iframeDom.length; i++) {
    const url = /http:|https:/.test(src) ? src : window.location.protocol + src
    if (iframeDom[i].src === url) {
      destroyIframe(iframeDom[i])
    }
  }
  //在document中创建iframe
  const iframe = document.createElement('iframe')

  //设置iframe的样式
  iframe.style.width = '100%'
  iframe.style.height = height + 'px'
  iframe.style.margin = '0'
  iframe.style.padding = '0'
  iframe.style.overflow = 'hidden'
  iframe.style.border = 'none'

  //绑定iframe的onload事件
  if (onload && Object.prototype.toString.call(onload) === '[object Function]') {
    if (iframe.attachEvent) {
      iframe.attachEvent('onload', onload)
    } else if (iframe.addEventListener) {
      iframe.addEventListener('load', onload)
    } else {
      iframe.onload = onload
    }
  }

  iframe.src = src
  //把iframe载入到dom以下
  dom.appendChild(iframe)
  return iframe
}
