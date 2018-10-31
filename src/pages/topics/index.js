import React from 'react'

import Shell from '../../components/shell'
import Meta from '../../components/meta'

export class Topics extends React.Component {

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

export default Shell(Topics);
