import React, { useState } from 'react'

import Slide from '@/components/Slide'
import Recommend from '@/components/Recommend'
import WeekDay from '@/components/Week'
import Top from '@/components/Top'
import List from '@/components/List'
import News from '@/components/News'
import NewsYG from '@/components/News/yugao'
import Ads from '@/components/Ads'

// 壳组件
import Shell from '@/components/Shell'
import Meta from '@/components/Meta'

import { DESCRIBE, KEYWORDS, DESCRIPTION } from 'Config'
import './style.scss'

export default Shell(() => {
  const [order, onSelect] = useState('addtime')
  return (
    <div className="warp-bg">
      <div className="wp">
        <Meta title={DESCRIBE} url="/">
          <meta name="keywords" content={KEYWORDS} />
          <meta name="description" content={DESCRIPTION} />
        </Meta>
        <div className="pt20" styleName="main top">
          <div styleName="top-left">
            <Slide />
          </div>
          <div styleName="top-right">
            <Recommend />
          </div>
        </div>
        <div>
          <Ads id={1} />
        </div>
        <div className="mt20" styleName="main">
          <div styleName="main-left">
            <WeekDay title="番剧" link="/week/1" isJp={['', '月', '火', '水', '木', '金', '土', '日']} type={1} />
          </div>
          <div styleName="main-right">
            <Top name="topListIndexJP" />
          </div>
        </div>
        <div>
          <Ads id={2} />
        </div>
        <div className="mt20" styleName="main news">
          <div styleName="main-left">
            <News name="newsPicList" />
          </div>
          <div styleName="main-right">
            <NewsYG name="newsTextList" isCate={true} />
          </div>
        </div>
        <div className="mt20" styleName="main cn">
          <div styleName="main-left">
            <WeekDay title="国创" link="/week/0" type={0} />
          </div>
          <div styleName="main-right">
            <Top name="topListIndexCN" />
          </div>
        </div>
      </div>
      <ul styleName="list-tab" className="mt20">
        <li styleName={order === 'addtime' ? 'active' : ''} onClick={() => onSelect('addtime')}>
          <a>按最新</a>
        </li>
        <li styleName={order === 'gold' ? 'active' : ''} onClick={() => onSelect('gold')}>
          <a>按评分</a>
        </li>
        <li styleName={order === 'hits' ? 'active' : ''} onClick={() => onSelect('hits')}>
          <a>按热度</a>
        </li>
      </ul>
      <List id={3} day={365} order={order} limit={30} scrollLoad={true} />
    </div>
  )
})
