import React, { PureComponent } from 'react'

import WeekDay from '@/components/Week/out'
// 壳组件
import Shell from '@/components/Shell'
import Meta from '@/components/Meta'

import './style.scss'

@Shell
class WeekOut extends PureComponent {
  render() {
    return (
      <div styleName="week-out">
        <Meta title="新番时间表" />
        <WeekDay />
      </div>
    )
  }
}

export default WeekOut
