import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { isNumber, formatPic } from '@/utils'

import './style.scss'

export default function BangumiItem({ data = [] }) {
  return (
    <div styleName="d-item">
      {data.map(item => (
        <li key={item.id}>
          <Link to={`/subject/${item.id}`}>
            <div className="load-demand" data-load-demand={`<img src="${formatPic(item.pic, 'orj360')}" alt="${item.title}" />`} />
            <h3>{item.title}</h3>
          </Link>
          <Link to={`/play/${item.id}/${item.pid}`}>
            {isNumber(item.status) ? (
              item.isDate ? (
                <p styleName="today">更新至{item.status}话</p>
              ) : (
                <p>更新至{item.status}话</p>
              )
            ) : item.isDate ? (
              <p styleName="today">{item.status}</p>
            ) : (
              <p>{item.status}</p>
            )}
          </Link>
        </li>
      ))}
    </div>
  )
}

BangumiItem.defaultProps = {
  data: []
}

BangumiItem.propTypes = {
  data: PropTypes.array
}
