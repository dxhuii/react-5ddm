;(function() {
  if (typeof window == 'undefined' || typeof document == 'undefined') {
    return
  }

  const backTop = () => {
    //设置定时器
    timer = setInterval(function() {
      //获取滚动条距离顶部的高度
      var osTop = document.documentElement.scrollTop || document.body.scrollTop //同时兼容了ie和Chrome浏览器

      //减小的速度
      var isSpeed = Math.floor(-osTop / 6)
      document.documentElement.scrollTop = document.body.scrollTop = osTop + isSpeed

      isTop = true

      //判断，然后清除定时器
      if (osTop == 0) {
        clearInterval(timer)
      }
    }, 30)
  }

  window.backTop = backTop
})()
