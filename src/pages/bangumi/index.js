import React from 'react';

import { detail } from '../../actions/detail'
import { playlist } from '../../actions/playlist'

import PlayList from '../../components/play/list'
import Detail from '../../components/play/detail'

import Shell from '../../components/shell';

export class Bangumi extends React.Component {

  // 服务端渲染
  // 加载需要在服务端渲染的数据
  static loadData({ store, match }) {
    return new Promise(async function (resolve, reject) {

      const { id } = match.params;
      await detail({id})(store.dispatch, store.getState)
      await playlist({id})(store.dispatch, store.getState)
      resolve({ code:200 });

    })
  }

  render() {
    return([
        <Detail key="detail" isMeta={true}/>,
        <PlayList key="playlist" />
      ])
  }
}

export default Shell(Bangumi);
