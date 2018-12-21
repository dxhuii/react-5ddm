import React, { Component, Fragment } from 'react'

// 壳组件
import Shell from '@/components/Shell'
import Meta from '@/components/Meta'

import News from '@/components/News'
import NewsYG from '@/components/News/yugao'

import './style.scss'
@Shell
class NewsIndex extends Component {
  constructor(props) {
    super(props)
    this.state = {
      order: 'addtime'
    }
  }

  onSelect = order => {
    console.log(order, 1)
    this.setState({
      order
    })
  }

  render() {
    const { order } = this.state
    return (
      <div className="warp-bg">
        <div className="wp pt20" styleName="news">
          <Meta title="新闻首页" />
          <div styleName="main-left">
            <News id="211,206,207,208,209,212,213,221" limit={12} order={order} />
          </div>
          <div styleName="main-right">
            <NewsYG />
          </div>
        </div>
      </div>
    )
  }
}

export default NewsIndex
