import React, { PureComponent } from 'react'

import Shell from '@/components/Shell'

import { isMobile } from '@/utils'

@Shell
class OutPic extends PureComponent {
  render() {
    return isMobile() ? <div /> : <div />
  }
}

export default OutPic
