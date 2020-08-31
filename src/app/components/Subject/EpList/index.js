import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import './style.scss'

export default function EpList({ data = [], id }) {
  return (
    <ul styleName='eplist' className='mt20'>
      {data.map(item => (
        <li key={item.pid}>
          <h4>
            <Link to={`/episode/${id}/${item.pid ? item.pid : 1}`}>
              {item.name} {item.title}
            </Link>
          </h4>
          <p>{item.content}</p>
        </li>
      ))}
    </ul>
  )
}

EpList.propTypes = {
  data: PropTypes.array.isRequired,
  id: PropTypes.any
}
