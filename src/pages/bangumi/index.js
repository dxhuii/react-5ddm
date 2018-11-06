import React from 'react';

import PlayList from '../../components/play/list'
import Detail from '../../components/play/detail'

import Shell from '../../components/shell';

@Shell
export class Bangumi extends React.Component {
  render() {
    return(
      <>
        <Detail key="detail" isMeta={true} />
        <PlayList key="playlist" />
      </>
    )
  }
}

export default Bangumi
