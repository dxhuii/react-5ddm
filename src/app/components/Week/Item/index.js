import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { isNumber, formatPic } from '@/utils'

import '../style.scss'

export default function Item({ data, type }) {
  return (
    <ul styleName={`week ${type === 0 ? 'weekCn' : type === 2 ? 'auto' : ''}`}>
      {data.map(item => (
        <li key={item.id}>
          <Link key={item.id} to={`/subject/${item.id}`}>
            <div
              className='load-demand'
              data-load-demand={`<img src="${formatPic(item.smallPic || item.pic, 'thumb150')}" alt="${item.title}" />`}
            />
            <h4>{item.title}</h4>
            {isNumber(item.status) ? (
              <p>
                更新至<span styleName={item.isDate ? 'today' : ''}>{item.status}话</span>
              </p>
            ) : (
              <p styleName='no'>
                <span styleName={item.isDate ? 'today' : ''}>{item.status}</span>
              </p>
            )}
          </Link>
        </li>
      ))}
    </ul>
  )
}

Item.defaultProps = {
  data: []
}
Item.propTypes = {
  data: PropTypes.array,
  type: PropTypes.number
}
