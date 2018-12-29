import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import './style.scss'

class MiniDetail extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    pic: PropTypes.string,
    gold: PropTypes.string,
    vid: PropTypes.number
  }

  render() {
    const { title, pic, gold, vid } = this.props
    return (
      <div styleName="detail-mini">
        <Link to={`/subject/${vid}`}>
          <img src={pic} alt={title} />
        </Link>
        {title}
        {gold}
      </div>
    )
  }
}

export default MiniDetail
