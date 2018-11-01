import React, { PureComponent } from 'react'

import Shell from '../../components/shell'
import Meta from '../../components/meta'

import WeekDay from '../../components/week'
import Top from '../../components/top'
import List from '../../components/list'

@Shell
export default class Week extends PureComponent {
  render() {
    return(
      <div className="row">
        <Meta title="星期" keywords="星期, 番表" description="星期" />
        <div className='col-12 col-lg-6 col-xl-9 mt-3'>
          <WeekDay id='weekday' title="番剧" link="/" isJp={['', '月','火','水','木','金','土','日']} type={1} />
        </div>
        <div className='col-12 col-lg-6 col-xl-3 mt-3'>
          <Top order="hits_month" area="JP" />
        </div>
        <div className='col-12 col-lg-6 col-xl-9 mt-3'>
          <WeekDay id='weekday' title="国创" link="/" type={0} />
        </div>
        <div className='col-12 col-lg-6 col-xl-3 mt-3'>
          <Top order="hits_month" area="CN" />
        </div>
        <div className='col mt-3'>
          <List stateId="weekList" id={3} day={365} order='addtime' limit={30} scrollLoad={true} />
        </div>
      </div>
    )
  }
}
