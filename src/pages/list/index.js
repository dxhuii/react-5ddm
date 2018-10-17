import React from 'react';

import List from '../../components/list'

import Shell from '../../components/shell';

@Shell
export class BangumiList extends React.Component {

  render() {
    return([
      <List key="list" scrollLoad={true} />
    ])
  }
}

export default BangumiList
