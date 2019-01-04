import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import './style.scss'

const EpList = props => {
  return (
    <ul styleName="eplist" className="mt20">
      {props.data.map(item => (
        <li key={item.pid}>
          <h4>
            <Link to={`/episode/${props.id}/${item.pid}`}>
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
  id: PropTypes.number.isRequired
}

export default EpList
