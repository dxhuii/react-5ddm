import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { formatPic } from '@/utils'

import './style.scss'

export default function NewsItem({ data }) {
  const menu = {
    211: 'zixun',
    206: 'donghua',
    205: 'manhua',
    207: 'cast',
    208: 'bagua',
    221: 'jianping',
    212: 'pic',
    222: 'video',
    214: 'yugao',
    215: 'op',
    216: 'bgm',
    217: 'ed',
    223: 'cm',
    220: 'mad',
    213: 'cosplay',
    218: 'shengrou',
    219: 'tedian',
    209: 'chanye'
  }

  return (
    <ul styleName="list">
      {data.map(item => (
        <li key={item.id}>
          <Link to={`/article/${item.id}`}>
            {item.pic ? <div className="load-demand" data-load-demand={`<img src="${formatPic(item.pic, 'orj360')}" alt="${item.title}" />`} /> : null}
          </Link>
          <div styleName="info">
            <h3>
              <Link to={`/article/${item.id}`}>{item.title}</Link>
            </h3>
            <div styleName="tag">&nbsp;</div>
            <p>
              <span styleName="share">
                <i className="iconfont">&#xe655;</i>分享
              </span>
              <span>
                分类：<Link to={`/news/${menu[item.cid] || 'news'}`}>{item.name}</Link>
              </span>
              <span>时间：{item.addtime}</span>
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}

NewsItem.defaultProps = {
  data: []
}
NewsItem.propTypes = {
  data: PropTypes.array
}
