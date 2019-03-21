import React, { PureComponent, Fragment } from 'react'

import Shell from '@/components/Shell'
import Meta from '@/components/Meta'

import Tooltip from '@/components/Tooltip'

@Shell
class Topics extends PureComponent {
  state = {}
  render() {
    return (
      <Fragment>
        <Meta title="话题" />
        <h2>Topics</h2>
        <Tooltip text="Simple tooltip">
          <button>Hover me!</button>
        </Tooltip>
      </Fragment>
    )
  }
}

export default Topics
