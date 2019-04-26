import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class Box extends PureComponent {
  static propTypes = {
    children: PropTypes.any
  }
  render() {
    return <div>{this.props.children}</div>
  }
}
