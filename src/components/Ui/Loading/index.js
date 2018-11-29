import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import './style.scss'

export default class Loading extends PureComponent {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    text: PropTypes.string
  }

  render() {
    const { text = '正在加载中...' } = this.props
    return (
      <div>
        <span styleName="loading" />
        {text}
      </div>
    )
  }
}
