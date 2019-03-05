import React, { Component } from 'react'

import WeekDay from '@/components/Week/out'

import './style.scss'
// 壳组件
import Shell from '@/components/Shell'

@Shell
class WeekOut extends Component {
  render() {
    return (
      <div styleName="week-out">
        <WeekDay />
      </div>
    )
  }
}

export default WeekOut
