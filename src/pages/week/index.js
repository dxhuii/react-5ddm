import React, { PureComponent } from 'react'

import Shell from '../../components/Shell'
import Meta from '../../components/Meta'
import WeekDay from '../../components/Week'

@Shell
class Week extends PureComponent {
  render() {
    return (
      <div className="row">
        <Meta title="星期" keywords="星期, 番表" description="星期" />
        <div className="col-12 mt-3">
          <WeekDay id="weekday" title="番剧" link="/" isJp={['', '月', '火', '水', '木', '金', '土', '日']} type={1} />
        </div>
        <div className="col-12 mt-3">
          <WeekDay id="weekday" title="国创" link="/" type={0} />
        </div>
      </div>
    )
  }
}

export default Week
