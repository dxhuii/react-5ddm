import React from 'react'
import PropTypes from 'prop-types'

import { isNumber, formatPic } from '@/utils'

import { DOMAIN } from 'Config'

import '../out.scss'

export default function Item({ data }) {
  return (
    <ul styleName='week'>
      {data.map(item => (
        <li key={item.id}>
          <a target='_blank' rel='noopener noreferrer' href={`${DOMAIN}/subject/${item.id}`} key={item.id}>
            <div>
              <img src={formatPic(item.smallPic || item.pic, 'thumb150')} alt={item.title} />
            </div>
            <h4>{item.title}</h4>
            {isNumber(item.status) ? (
              item.isDate ? (
                <p>
                  更新至
                  <span styleName='today'>{item.status}话</span>
                </p>
              ) : (
                <p>
                  更新至
                  <span>{item.status}话</span>
                </p>
              )
            ) : (
              <p styleName='no'>{item.isDate ? <span styleName='today'>{item.status}</span> : <span>{item.status}</span>}</p>
            )}
          </a>
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
