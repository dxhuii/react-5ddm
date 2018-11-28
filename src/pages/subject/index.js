import React, { Component, Fragment } from 'react'

import PlayList from '../../components/Play/PlayList'
import Detail from '../../components/Detail'

import Shell from '../../components/Shell'

@Shell
export class Bangumi extends Component {
  render() {
    return (
      <Fragment>
        <Detail key="detail" isMeta={true} />
        <PlayList key="playlist" />
      </Fragment>
    )
  }
}

export default Bangumi
