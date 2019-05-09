var isMoblie = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
/**
 * @type 类别
 * 1 图文
 * 2 JS
 * 3 iframe
 */
var income = isMoblie
  ? {
      // 手机首页顶部广告
      1: {
        type: 2,
        content: ''
      },
      // 手机首页中部
      2: {
        type: 2,
        content: 'https://img.nktcw.cn/1364.js'
      },
      // 手机端播放列表上广告位
      3: {
        type: 2,
        content: ''
      },
      // 手机端播放列表下广告位2
      4: {
        type: 2,
        content: 'https://img.nktcw.cn/1364.js'
      },
      // 全站底漂
      5: {
        type: 2,
        content: 'https://m.xi7h.cn/37/44707.js'
      },
      // 播放列表下广告位1
      6: {
        type: 1,
        content: ''
      },
      // 手机除首页，详情页，播放页头部通栏
      7: {
        type: 1,
        content: ''
      },
      // 手机底部通栏
      8: {
        type: 3,
        height: 190,
        content: 'https://www.99496.com/in/in.html'
      },
      // 手机端右悬浮广告
      9: {
        type: 2,
        content: 'https://m.xi7h.cn/19/46341.js?Math.round(Math.random() * 10000)'
      },
      10: {},
      // 新闻详情页
      11: {
        type: 2,
        content: 'https://img.nktcw.cn/1364.js'
      }
    }
  : {
      // 首页顶部广告1240*90
      1: {
        type: 1,
        content: ''
      },
      // 首页中部1240*90
      2: {
        type: 1,
        content:
          '<div class="wp mt20 pr"><a href="https://www.doorzo.com/?utm_source=bbs&utm_medium=banner&utm_campaign=ikf&utm_term=ikf1" target="_blank"><img src="https://wxt.sinaimg.cn/large/006bnWk0gy1fu4tqqe1bmj30xc02idgx.jpg" style="display: block;width: 100%;"></a><span class="d-badge">广告</span></div>'
      },
      // 内页通栏靠上位置1240*90
      3: {},
      // 内页中部1240*90
      4: {
        type: 1,
        content:
          '<div class="wp mt20 pr"><a href="https://www.doorzo.com/?utm_source=bbs&utm_medium=banner&utm_campaign=ikf&utm_term=ikf1" target="_blank"><img src="https://wxt.sinaimg.cn/large/006bnWk0gy1fu4tqqe1bmj30xc02idgx.jpg" style="display: block;width: 100%;"></a><span class="d-badge">广告</span></div>'
      },
      // PC全站右下角悬浮广告
      5: {
        type: 2,
        content: 'https://19.dlads.cn/musics.php?id=889'
      },
      // 播放列表下广告位1
      6: {
        type: 1,
        content:
          '<div class="wp mt20 pr"><a href="https://api.moeyoyo.com/erciyuan.php" target="_blank"><img src="https://wxt.sinaimg.cn/large/006bnWk0gy1fzm555pblpj30xc02ntau.jpg" style="display: block;width: 100%;"></a><span class="d-badge">广告</span></div>'
      },
      // 除首页，详情页，播放页头部通栏
      7: {
        type: 1,
        content: ''
      },
      // PC底部通栏
      8: {
        type: 1,
        content:
          '<div class="wp mt20 pr"><a href="https://www.doorzo.com/?utm_source=bbs&utm_medium=banner&utm_campaign=ikf&utm_term=ikf1" target="_blank"><img src="https://wxt.sinaimg.cn/large/006bnWk0gy1fu4tqqe1bmj30xc02idgx.jpg" style="display: block;width: 100%;"></a><span class="d-badge">广告</span></div>'
      },
      9: {},
      // 全站右侧300x250
      10: {
        type: 1,
        content: ''
      },
      // 新闻详情页
      11: {}
    }
