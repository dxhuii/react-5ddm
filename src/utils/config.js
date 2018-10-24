export default {
  api: {
    login: 'https://www.99496.com/api.php?s=home-search-login',
    playlist: ({ id }) => `https://www.99496.com/api.php?s=home-vod-playerJson-id-${id}-react-1`, // 播放列表 id:视频id
    player: ({ id, pid }) => `https://www.99496.com/api.php?s=home-vod-playerJson-id-${id}-pid-${pid}`, // 单集 id:视频id，pid，集数
    detail: ({ id }) => `https://www.99496.com/api.php?s=home-search-reactDetail&q=${id}`, // 视频详情
    newsDetail: 'https://www.99496.com/api.php?s=home-news-readdetail-id-',  // 新闻内容接口
    week: ({ limit }) => `https://www.99496.com/api.php?s=home-search-reactWeek&limit=${limit}`,  // 每周追番
    /**
	 * 排行榜
	 * $hits
	 * hits 总排行
	 * hits_week 	周排行
	 * hits_day  	日排行
	 * hits_month	月排行
	 * addtime		按最新
	 * area			按地区，默认全部，日本，国产
	 * lz			是否连载 1 为连载 0 完结
	 */
    top: ({ order, area, lz }) => `https://www.99496.com/api.php?s=home-search-reactlist&order=${order}${area ? `&area=${area}` : ''}${lz ? `&lz=${lz}` : ''}`, //获取列表
    typelist: ({ id = 3, mcid = '', area = '', year = '', letter = '', order = 'addtime', limit = 30, lz = '', page = 1 }) => {
      return `https://www.99496.com/api.php?s=home-vod-ajaxtype-id-${id}-mcid-${mcid}-area-${area}-year-${year}-letter-${letter}-order-${order}-limit-${limit}-lz-${lz}-p-${page}`
    }, // 列表接口
  }
}
