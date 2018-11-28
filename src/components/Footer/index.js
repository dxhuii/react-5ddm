import React, { PureComponent } from 'react'

import './style.scss'

export default class Footer extends PureComponent {
  top = () => {
    backTop()
  }

  render() {
    return (
      <a styleName="top" onClick={this.top} href="javascript:;">
        top
      </a>
    )
  }
}
