import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import './style.scss'

export default function NewsText({ data = [] }) {
  return (
    <ul styleName='d-yugao'>
      <li styleName='top'>
        <span styleName='time'>发布时间</span>
        <span styleName='name'>视频名称</span>
        <span styleName='clarity'>清晰度</span>
        <span styleName='play'>播放</span>
        <span styleName='source'>来源</span>
      </li>
      {data.map(item => (
        <li key={item.id}>
          <span styleName='time'>{item.addtime}</span>
          <span styleName='name'>
            <Link to={`/article/${item.id}`} title={item.title}>
              {item.title}
            </Link>
            <em>{item.playtime}</em>
          </span>
          <span styleName='clarity'>{item.clarity}</span>
          <span styleName='play'>
            <Link to={`/article/${item.id}`} title={item.title}>
              <em>播放</em>
            </Link>
          </span>
          <span styleName='source'>
            <i className={`playicon ${item.playname}`} />
          </span>
        </li>
      ))}
    </ul>
  )
}

NewsText.propTypes = {
  data: PropTypes.array.isRequired
}
