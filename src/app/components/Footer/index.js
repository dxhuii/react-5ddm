import React, { PureComponent } from 'react'
import Globel from '@/components/Global'
import { isMobile } from '@/utils'
import { NAME, EMAIL, DOMAIN_NAME, WW, ICP, BEIAN } from 'Config'
import './style.scss'

export default class Footer extends PureComponent {
  render() {
    return (
      <footer styleName="footer" className="wp tac mt20">
        <p>
          {!isMobile() ? (
            <span>
              ©{new Date().getFullYear()} {NAME}[{DOMAIN_NAME}] 所有内容均收集引用于互联网公开的资源，本站只提供引用，不参与视频制作上传，不提供视频储存下载。
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
        <Globel />
      </footer>
    )
  }
}
