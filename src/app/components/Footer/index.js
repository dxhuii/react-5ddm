import React, { PureComponent, Fragment } from 'react'
import { isMobile } from '@/utils'

import Ads from '@/components/Ads'

import './style.scss'

export default class Footer extends PureComponent {
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
            footer <br />
            footer <br />
            footer
          </p>
          <a styleName="top" onClick={this.top} href="javascript:;">
            <i className="iconfont">&#xe900;</i>
          </a>
        </footer>
      </Fragment>
    )
  }
}
