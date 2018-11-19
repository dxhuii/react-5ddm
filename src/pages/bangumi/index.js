import React, { Component, Fragment } from 'react'

import PlayList from '../../components/playList'
import Detail from '../../components/detail'

import Shell from '../../components/shell'

@Shell
export class Bangumi extends Component {
  render() {
    return(
      <Fragment>
        <Detail key="detail" isMeta={true} />
        <PlayList key="playlist" />
      </Fragment>
    )
  }
}

export default Bangumi
