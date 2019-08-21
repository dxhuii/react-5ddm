import React from 'react'

import './style.scss'

export default function() {
  const top = () => {
    if (!(typeof window === 'undefined' || typeof document === 'undefined')) {
      // 设置定时器
      let timer = setInterval(() => {
        // 获取滚动条距离顶部的高度
        const osTop = document.documentElement.scrollTop || document.body.scrollTop // 同时兼容了ie和Chrome浏览器

        // 减小的速度
        const isSpeed = Math.floor(-osTop / 6)
        document.documentElement.scrollTop = document.body.scrollTop = osTop + isSpeed

        // 判断，然后清除定时器
        if (osTop === 0) {
          clearInterval(timer)
        }
      }, 30)
    }
  }

  return (
    <a styleName="top" onClick={top}>
      <i className="iconfont">&#xe900;</i>
    </a>
  )
}
