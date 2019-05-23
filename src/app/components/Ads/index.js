import React, { useState, useEffect, useRef } from 'react'

import { ISAD } from 'Config'
import { loadScript } from '@/utils'

export default function Ads(props) {
  const [type, setType] = useState(0)
  const ads = useRef(null)

  function createAd(url) {
    let script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = url
    script.async = 1
    ads.current.appendChild(script)
  }

  /**
   * 动态创建iframe
   * @param dom 创建iframe的容器，即在dom中创建iframe。dom能够是div、span或者其它标签。
   * @param src iframe中打开的网页路径
   * @param onload iframe载入完后触发该事件。能够为空
   * @return 返回创建的iframe对象
   */
  function createIframe(dom, src, height = 90, onload) {
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

  /**
   * 销毁iframe，释放iframe所占用的内存。
   * @param iframe 须要销毁的iframe对象
   */
  function destroyIframe(iframe) {
    //把iframe指向空白页面，这样能够释放大部分内存。
    iframe.src = 'about:blank'
    try {
      iframe.contentWindow.document.write('')
      iframe.contentWindow.document.clear()
    } catch (e) {
      console.log(e)
    }
    //把iframe从页面移除
    iframe.parentNode.removeChild(iframe)
  }

  function showAd(content) {
    ads.current.innerHTML = content
  }

  useEffect(() => {
    if (ISAD) {
      const { id } = props
      loadScript('//cos.mdb6.com/static/income.min.js', true, function() {
        if (income[id]) {
          const { type, content, height } = income[id]
          setType(type)
          if (type === 2) {
            createAd(content)
          } else if (type === 1) {
            showAd(content)
          } else if (type === 3) {
            createIframe(ads.current, content, height)
          }
        }
      })
    }
  }, [props])

  return ISAD ? <div ref={ads} className={type !== 1 ? 'mt20' : ''} /> : null
}
