import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { formatPic } from '@/utils'

import './style.scss'

export default function NewsPic({ data = [] }) {
  return (
    <ul styleName="newslist">
      {data.map(item => (
        <li key={item.id}>
          <Link to={`/article/${item.id}`}>
            <img src={formatPic(item.pic, 'orj360')} alt={item.title} />
            <div styleName="mark">
              <p>{item.title}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}

NewsPic.propTypes = {
  data: PropTypes.array.isRequired
}
