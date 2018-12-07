import React, { PureComponent, Fragment } from 'react'

import Shell from '@/components/Shell'
import Meta from '@/components/Meta'

@Shell
class Topics extends PureComponent {
  render() {
    return (
      <Fragment>
        <Meta title="话题" />
        <h2>Topics</h2>
      </Fragment>
    )
  }
}

export default Topics
