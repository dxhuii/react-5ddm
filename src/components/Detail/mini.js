import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import './mini.scss'

class MiniDetail extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    pic: PropTypes.string,
    gold: PropTypes.string
  }

  render() {
    const { title, pic, gold } = this.props
    return (
      <div styleName="detail-mini">
        <img src={pic} alt={title} />
        {title}
        {gold}
      </div>
    )
  }
}

export default MiniDetail
