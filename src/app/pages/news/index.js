import React, { PureComponent } from 'react'

// 壳组件
import Shell from '@/components/Shell'
import Meta from '@/components/Meta'

import News from '@/components/News'
import NewsYG from '@/components/News/yugao'

import './style.scss'
@Shell
class NewsIndex extends PureComponent {
  render() {
    return (
      <div className="warp-bg">
        <div className="wp pt20" styleName="news">
          <Meta title="新闻首页" />
          <div styleName="main-left">
            <News name="newsPicList" />
          </div>
          <div styleName="main-right">
            <NewsYG name="newsTextList" isCate={true} />
          </div>
        </div>
      </div>
    )
  }
}

export default NewsIndex
