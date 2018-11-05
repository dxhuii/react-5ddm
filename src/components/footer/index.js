import React, { PureComponent } from 'react'

import CSSModules from 'react-css-modules'
import styles from './index.scss'

@CSSModules(styles, { allowMultiple: true })
export default class Footer extends PureComponent {

  top = () => {
    backTop()
  }

  render(){
    return <a styleName='top' onClick={this.top} href="javascript:;">top</a>
  }
}
