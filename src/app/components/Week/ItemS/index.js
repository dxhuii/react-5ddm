import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { isNumber, formatPic } from '@/utils'

import './style.scss'

export default function Item({ data }) {
  return (
    <ul styleName='weeks'>
      {data.map(item => (
        <li key={item.id}>
          <Link key={item.id} to={`/subject/${item.id}`}>
            <div
              className='load-demand'
              data-load-demand={`<img src="${formatPic(item.smallPic || item.pic, 'thumb150')}" alt="${item.title}" />`}
            />
            <h4>{item.title}</h4>
            <p styleName={item.isDate ? 'today' : ''}>{isNumber(item.status) ? `第${item.status}话` : item.status}</p>
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
  data: PropTypes.array
}
