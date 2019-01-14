import React, { PureComponent } from 'react'

import './style.scss'

export default class Loading extends PureComponent {
  render() {
    return (
      <div styleName="loading">
        <i /> <i /> <i /> <i />
        <i />
      </div>
    )
  }
}
