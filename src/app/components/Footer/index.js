import React, { PureComponent, Fragment } from 'react'
import ScrollTop from '@/components/ScrollTop'
import Ads from '@/components/Ads'
import { isMobile } from '@/utils'
import { NAME, EMAIL, DOMAIN_NAME } from 'Config'
import './style.scss'

export default class Footer extends PureComponent {
  render() {
    return (
      <>
        <footer styleName='footer' className='wp tac mt20'>
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
            <span> 或联系QQ916091535{isMobile() ? <br /> : null}</span>
          </p>
          <ScrollTop />
        </footer>
      </>
    )
  }
}
