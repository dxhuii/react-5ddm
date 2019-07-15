import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Share from '@/components/Share'
import './style.scss'

export default function TagShare({ tag, config, location }) {
  return (
    <div styleName="article-tool">
      <div styleName="article-tool__tag">
        {tag.map((item, index) => (
          <Link to={`/search/${item}`} key={index}>
            #{item}
          </Link>
        ))}
      </div>
      <div styleName="article-tool__share">
        <Share data={config} location={location} />
      </div>
    </div>
  )
}

TagShare.defaultProps = {
  tag: []
}
TagShare.propTypes = {
  tag: PropTypes.array,
  config: PropTypes.object,
  location: PropTypes.object
}
