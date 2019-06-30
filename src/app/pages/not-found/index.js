import React, { PureComponent } from 'react'

import Shell from '@/components/Shell'
import Meta from '@/components/Meta'
@Shell
class NotFound extends PureComponent {
  static loadData({ store, match }) {
    return new Promise(async function(resolve, reject) {
      resolve({ code: 404 })
    })
  }

  render() {
    return (
      <>
        <Meta title="404,无法找到该页面" />
        404,无法找到该页面
      </>
    )
  }
}

export default NotFound
