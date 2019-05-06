import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { ISAD } from 'Config'
import { loadScript } from '@/utils'

class Ads extends Component {
  static propTypes = {
    id: PropTypes.number
  }
  constructor(props) {
    super(props)
    this.state = {
      type: 0
    }
  }

  componentDidMount() {
    if (ISAD) {
      const { id } = this.props
      const that = this
      loadScript('https://cos.mdb6.com/dddm/income.min.js', true, function() {
        // console.log(income)
        if (income[id]) {
          const { type, content } = income[id]
          that.setState({
            type
          })
          if (type === 2) {
            that.createAd(content)
          } else if (type === 1) {
            that.showAd(content)
          } else if (type === 3) {
            that.createIframe(that.ads, content)
          }
        }
      })
    }
  }

  createAd(url) {
    let script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = url
    script.async = 1
    this.ads.appendChild(script)
  }

  /**
   * 动态创建iframe
   * @param dom 创建iframe的容器，即在dom中创建iframe。dom能够是div、span或者其它标签。
   * @param src iframe中打开的网页路径
   * @param onload iframe载入完后触发该事件。能够为空
   * @return 返回创建的iframe对象
   */
  createIframe(dom, src, onload) {
    //在document中创建iframe
    const iframe = document.createElement('iframe')

    //设置iframe的样式
    iframe.style.width = '100%'
    iframe.style.height = '90px'
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
  destroyIframe(iframe) {
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

  showAd(content) {
    this.ads.innerHTML = content
  }

  render() {
    return ISAD ? <div ref={e => (this.ads = e)} className={this.state.type !== 1 ? 'mt20' : ''} /> : null
  }
}

export default Ads
