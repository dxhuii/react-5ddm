import React, { PureComponent, Fragment } from 'react'

import Shell from '@/components/Shell'
import Meta from '@/components/Meta'
import WeekDay from '@/components/Week'

@Shell
class Week extends PureComponent {
  render() {
    return (
      <Fragment>
        <Meta title="星期" keywords="星期, 番表" description="星期" />
        <div className="mt20 wp">
          <WeekDay id="weekday" title="番剧" isJp={['', '月', '火', '水', '木', '金', '土', '日']} type={1} />
        </div>
        <div className="mt20 wp">
          <WeekDay id="weekday" title="国创" type={0} />
        </div>
      </Fragment>
    )
  }
}

export default Week
