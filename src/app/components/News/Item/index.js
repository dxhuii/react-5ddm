import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { formatPic } from '@/utils'

import './style.scss'

export default function NewsItem({ data }) {
  const reNewsCateName = id => {
    let name
    switch (id) {
      case 211:
        name = 'zixun'
        break
      case 206:
        name = 'donghua'
        break
      case 205:
        name = 'manhua'
        break
      case 207:
        name = 'cast'
        break
      case 208:
        name = 'bagua'
        break
      case 221:
        name = 'jianping'
        break
      case 212:
        name = 'pic'
        break
      case 222:
        name = 'video'
        break
      case 214:
        name = 'yugao'
        break
      case 215:
        name = 'op'
        break
      case 216:
        name = 'bgm'
        break
      case 217:
        name = 'ed'
        break
      case 223:
        name = 'cm'
        break
      case 213:
        name = 'cosplay'
        break
      case 220:
        name = 'mad'
        break
      case 218:
        name = 'shengrou'
        break
      case 219:
        name = 'tedian'
        break
      case 209:
        name = 'chanye'
        break
      default:
        name = 'news'
        break
    }
    return name
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
                分类：<Link to={`/news/${reNewsCateName(item.cid)}`}>{item.name}</Link>
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
