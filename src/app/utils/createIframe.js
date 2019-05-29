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
export const createIframe = (dom, src, height = 90) => {
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

  iframe.src = src
  //把iframe载入到dom以下
  dom && dom.appendChild(iframe)
  return iframe
}
