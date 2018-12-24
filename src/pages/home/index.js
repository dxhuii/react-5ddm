import React, { Component, Fragment } from 'react'

// 壳组件
import Shell from '@/components/Shell'
import Meta from '@/components/Meta'

import WeekDay from '@/components/Week'
import Top from '@/components/Top'
import List from '@/components/List'
import News from '@/components/News'
import NewsYG from '@/components/News/yugao'
import Swiper from '@/components/Swiper'

import './style.scss'

@Shell
class Home extends Component {
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
        <div className="wp">
          <Meta title="首页" />
          <div className="pt20" styleName="main top">
            <div styleName="top-left">
              <Swiper />
            </div>
            <div styleName="top-right">
              <ul styleName="recommend">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt20" styleName="main">
            <div styleName="main-left">
              <WeekDay title="番剧" link="/week" isJp={['', '月', '火', '水', '木', '金', '土', '日']} type={1} />
            </div>
            <div styleName="main-right">
              <Top id={3} order="hits_month" area="日本" limit={10} />
            </div>
          </div>
          <div className="mt20" styleName="main news">
            <div styleName="main-left">
              <News id="211,206,207,208,209,212,213,221" limit={12} order={order} />
            </div>
            <div styleName="main-right">
              <NewsYG />
            </div>
          </div>
          <div className="mt20" styleName="main cn">
            <div styleName="main-left">
              <WeekDay title="国创" link="/week" type={0} />
            </div>
            <div styleName="main-right">
              <Top id={3} order="hits_month" area="大陆" limit={7} />
            </div>
          </div>
        </div>
        <ul styleName="list-tab" className="mt20">
          <li styleName={order === 'addtime' ? 'active' : ''} onClick={() => this.onSelect('addtime')}>
            <a>按最新</a>
          </li>
          <li styleName={order === 'gold' ? 'active' : ''} onClick={() => this.onSelect('gold')}>
            <a>按评分</a>
          </li>
          <li styleName={order === 'hits' ? 'active' : ''} onClick={() => this.onSelect('hits')}>
            <a>按热度</a>
          </li>
        </ul>
        <List stateId="weekList" id={3} day={365} order={order} limit={30} scrollLoad={true} />
      </div>
    )
  }
}

export default Home
