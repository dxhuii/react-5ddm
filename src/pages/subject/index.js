import React, { Component, Fragment } from 'react'

import PlayList from '@/components/Play/PlayList'
import Detail from '@/components/Detail'

import Shell from '@/components/Shell'

@Shell
class Bangumi extends Component {
  render() {
    return (
      <div className="warp-bg">
        <Detail key="detail" isMeta={true} />
        <PlayList key="playlist" />
      </div>
    )
  }
}

export default Bangumi
