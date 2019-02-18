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
        {isMobile() ? (
          <div className="mt20">
            <Ads id={24} url={this.path()} />
          </div>
        ) : (
          <Ads id={25} url={this.path()} />
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
        </footer>
      </Fragment>
    )
  }
}
