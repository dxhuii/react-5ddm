import React, { PureComponent } from 'react'

import './style.scss'

export default class Loading extends PureComponent {
  render() {
    return (
      <div styleName="loading">
        <span>
          <i />
          <i />
          <i />
          <i />
        </span>
      </div>
    )
  }
}
