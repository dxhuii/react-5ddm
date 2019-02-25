const __cache = {} //用来存放缓存的全局变量。
export default (function() {
  const o = {}
  /**
   * 添加一个新缓存
   * @param cachename 缓存名
   * @param value 缓存值
   * @param msec 缓存时间 毫秒如果不加时间默认1分钟。
   */
  o.addCache = (cachename, value, msec) => {
    const msecs = msec ? msec : 60 * 60 * 5
    const tcache = cachename
    __cache[tcache] = value
    setTimeout(function() {
      //使用TIMEOUT来处理超时时的删除。
      delete __cache[tcache]
    }, msecs)
  }
  o.getCache = cachename => {
    return __cache[cachename]
  }
  /**
   * 删除缓存
   * @param cachename 删除的缓存名称
   */
  o.delCache = cachename => {
    delete __cache[cachename]
  }
  //console.log(o);
  return o
})()
