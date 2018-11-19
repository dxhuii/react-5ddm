import React, { PureComponent, Fragment } from 'react';

import Shell from '../../components/shell';
import Meta from '../../components/meta';

export class NotFound extends PureComponent {

  static loadData({ store, match }) {
    return new Promise(async function (resolve, reject) {
      resolve({ code:404 });
    })
  }

  constructor(props) {
    super(props);
  }

  render() {
    return(<Fragment>
      <Meta title="404,无法找到该页面" />
      404,无法找到该页面
    </Fragment>)
  }

}

export default Shell(NotFound);
