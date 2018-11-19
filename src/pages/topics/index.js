import React, { PureComponent, Fragment } from 'react'

import Shell from '../../components/shell'
import Meta from '../../components/meta'

@Shell
export class Topics extends PureComponent {

  constructor(props) {
    super(props)
  }

  render() {
    return(<Fragment>
      <Meta title="话题" />
      <h2>Topics</h2>
    </Fragment>)
  }

}

export default Topics;
