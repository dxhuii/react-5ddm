import React, { PureComponent } from 'react';

// 壳组件
import Shell from '../../components/Shell';
import Meta from '../../components/Meta';

import WeekDay from '../../components/Week'
import Top from '../../components/Top'
import List from '../../components/List'

// 生成异步加载组件
import { AsyncComponent } from '../../components/generate-async-component'

@Shell
export default class Home extends PureComponent {

  constructor(props) {
    super(props);
  }

  render() {
    return(
    <div className="row">
      <Meta title="首页" />
      <AsyncComponent load={() => import('../../components/Swiper')}>
        {Component => <Component />}
      </AsyncComponent>
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
    </div>)
  }
}
