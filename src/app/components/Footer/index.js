import React, { PureComponent, Fragment } from 'react'
import { isMobile } from '@/utils'

import Ads from '@/components/Ads'
import { CNZZ_STAT, BAIDU_STAT, NAME, EMAIL, DOMAIN_NAME, WW, ICP, BEIAN } from 'Config'

import './style.scss'

export default class Footer extends PureComponent {
  componentDidMount() {
    const url = `https://s13.cnzz.com/z_stat.php?id=${CNZZ_STAT}&web_id=${CNZZ_STAT}`
    this.createAd(url)

    var _hmt = _hmt || []
    ;(function() {
      var hm = document.createElement('script')
      hm.src = `https://hm.baidu.com/hm.js?${BAIDU_STAT}`
      var s = document.getElementsByTagName('script')[0]
      s.parentNode.insertBefore(hm, s)
    })()
    ;(function() {
      var bp = document.createElement('script')
      bp.src = 'https://zz.bdstatic.com/linksubmit/push.js'
      var s = document.getElementsByTagName('script')[0]
      s.parentNode.insertBefore(bp, s)
    })()

    // this.createIframe(this.iframe, 'https://www.xiaoduyu.com')
  }

  componentWillUnmount() {
    this.destroyIframe()
  }

  createAd(url) {
    let script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = url
    this.cnzz.appendChild(script)
  }

  path = () => {
    if (typeof window === 'undefined') {
      return
    }
    return window.location.pathname
  }

  // /**
  //  * 动态创建iframe
  //  * @param dom 创建iframe的容器，即在dom中创建iframe。dom能够是div、span或者其它标签。
  //  * @param src iframe中打开的网页路径
  //  * @param onload iframe载入完后触发该事件。能够为空
  //  * @return 返回创建的iframe对象
  //  */
  // createIframe(dom, src, onload) {
  //   //在document中创建iframe
  //   var iframe = document.createElement('iframe')

  //   //设置iframe的样式
  //   iframe.style.width = '100%'
  //   iframe.style.height = '1000px'
  //   iframe.style.margin = '0'
  //   iframe.style.padding = '0'
  //   iframe.style.overflow = 'hidden'
  //   iframe.style.border = 'none'

  //   //绑定iframe的onload事件
  //   if (onload && Object.prototype.toString.call(onload) === '[object Function]') {
  //     if (iframe.attachEvent) {
  //       iframe.attachEvent('onload', onload)
  //     } else if (iframe.addEventListener) {
  //       iframe.addEventListener('load', onload)
  //     } else {
  //       iframe.onload = onload
  //     }
  //   }

  //   iframe.src = src
  //   //把iframe载入到dom以下
  //   dom.appendChild(iframe)
  //   return iframe
  // }

  // /**
  //  * 销毁iframe，释放iframe所占用的内存。

  // * @param iframe 须要销毁的iframe对象
  // */
  // destroyIframe(iframe) {
  //   //把iframe指向空白页面，这样能够释放大部分内存。
  //   iframe.src = 'about:blank'
  //   try {
  //     iframe.contentWindow.document.write('')
  //     iframe.contentWindow.document.clear()
  //   } catch (e) {
  //     console.log(e)
  //   }
  //   //把iframe从页面移除
  //   iframe.parentNode.removeChild(iframe)
  // }

  top = () => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return
    }
    // 设置定时器
    let timer = setInterval(() => {
      // 获取滚动条距离顶部的高度
      var osTop = document.documentElement.scrollTop || document.body.scrollTop // 同时兼容了ie和Chrome浏览器

      // 减小的速度
      var isSpeed = Math.floor(-osTop / 6)
      document.documentElement.scrollTop = document.body.scrollTop = osTop + isSpeed

      // 判断，然后清除定时器
      if (osTop === 0) {
        clearInterval(timer)
      }
    }, 30)
  }

  render() {
    return (
      <Fragment>
        {isMobile() && (
          <div className="mt20">
            <Ads id={24} url={this.path()} />
          </div>
        )}
        <footer styleName="footer" className="wp tac mt20">
          <p>
            {!isMobile() ? (
              <span>
                ©{new Date().getFullYear()} {NAME}[{DOMAIN_NAME}]
                所有内容均收集引用于互联网公开的资源，本站只提供引用，不参与视频制作上传，不提供视频储存下载。
                <br />
                若本站的引用侵犯了您的利益，请联系我们核查所实后将在第一时间删除。欢迎对本站引用内容进行监督，共创绿色健康互联网。
                <br />
              </span>
            ) : null}
            联系邮箱：{EMAIL}
            {DOMAIN_NAME === '99496.com' ? <span> 或联系QQ916091535{isMobile() ? <br /> : null}</span> : null}
            {ICP ? (
              <a href="http://www.miitbeian.gov.cn/" target="_blank" rel="noopener noreferrer">
                {ICP}
              </a>
            ) : null}
            {BEIAN ? (
              <span>
                <a href="http://www.beian.gov.cn/portal/registerSystemInfo?COLLCC=1146923681&recordcode=34130202000190">
                  <img src="https://ww3.sinaimg.cn/large/628d024fgw1f63puhjy82j200k00k3y9.jpg" />
                  皖公网安备 34130202000190 号
                </a>
                {isMobile() ? <br /> : null}
              </span>
            ) : null}
            {WW ? WW : null}
          </p>
          <a styleName="top" onClick={this.top} href="javascript:;">
            <i className="iconfont">&#xe900;</i>
          </a>
          <div ref={e => (this.cnzz = e)} />
          {/* <div ref={e => (this.iframe = e)} style={{ position: 'absolute', left: -99999, top: -99999 }} /> */}
        </footer>
      </Fragment>
    )
  }
}
