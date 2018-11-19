import React, { PureComponent } from 'react'

import './style.scss'

export default class LoadingMore extends PureComponent {

  constructor(props) {
    super(props)
  }

  render() {
    const { text = '正在加载中...' } = this.props
    return <div><span styleName="loading"></span>{text}</div>
  }
}
