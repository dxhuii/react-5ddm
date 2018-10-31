import React, { PureComponent } from 'react'

import Shell from '../../components/shell'
import Meta from '../../components/meta'

@Shell
export class Topics extends PureComponent {

  constructor(props) {
    super(props)
  }

  render() {
    return(<>
      <Meta title="话题" />
      <h2>Topics</h2>
    </>)
  }

}

export default Topics;
