import { API } from 'Config'

export default {
  api: {
    login: `${API}api.php?s=home-react-login`,
    addScore: `${API}api.php?s=home-react-addScore`, // 评分 val 分值 id 视频ID sid 视频大类
    getVodId: ({ pinyin }) => `${API}api.php?s=home-react-getVodId&pinyin=${pinyin}`, // 根据拼音获取视频ID
    playlist: ({ id, pinyin }) => `${API}api.php?s=home-react-play${id ? `&id=${id}` : pinyin ? `&pinyin=${pinyin}` : ''}&react=1`, // 播放列表 id:视频id
    player: ({ id, pid }) => `${API}api.php?s=home-react-play-id-${id}-pid-${pid}`, // 单集 id:视频id，pid，集数
    detail: ({ id, pinyin }) => `${API}api.php?s=home-react-detail${id ? `&id=${id}` : pinyin ? `&pinyin=${pinyin}` : ''}`, // 视频详情
    week: () => `${API}api.php?s=home-react-list-id-3-react-1-limit-1000`, // 每周追番
    search: ({ wd }) => `${API}api.php?s=home-react-list-id-3-wd-${wd}-order-hits_month-p-0`, // 联想搜索
    /**
     * 获取列表
     * $hits
     * hits 总排行
     * hits_week  周排行
     * hits_day 日排行
     * hits_month 月排行
     * addtime  按最新
     * area 按地区，默认全部，日本，国产
     * lz 是否连载 1 为连载 0 完结
     */
    typelist: ({
      id = 3,
      mcid = '',
      area = '',
      year = '',
      letter = '',
      wd = '',
      language = '',
      order = 'addtime',
      limit = 30,
      lz = '',
      page = 0
    }) =>
      `${API}api.php?s=home-react-list-id-${id}-mcid-${mcid}-area-${area}-year-${year}-wd-${wd}-language-${language}-letter-${letter}-order-${order}-limit-${limit}-lz-${lz}-p-${page}`, // 列表接口
    topListIndexCN: () => `${API}api.php?s=home-react-list-id-3-area-%E5%A4%A7%E9%99%86-day-30-order-hits_month-limit-7-p-0`, // 首页国创排行
    topListIndexJP: () => `${API}api.php?s=home-react-list-id-3-area-%E6%97%A5%E6%9C%AC-day-30-order-hits_month-limit-10-p-0`, // 首页日本排行
    topListAll: () => `${API}api.php?s=home-react-list-id-3-day-30-order-hits_month-limit-10-p-0`, // 排行
    actorsList: ({ actor = '', no }) => `${API}api.php?s=home-react-list-id-3${actor ? `-actor-${actor}` : ''}-no-${no}-limit-10-p-0`, // 首页日本排行
    recommendAnime: () => `${API}api.php?s=home-react-list-id-3-day-7-order-hits_week-limit-4--p-0`, // 首页最近7天热门动漫
    recommendNews: () =>
      `${API}api.php?s=home-react-newsList-id-211,206,205,207,208,209,212,213,221,222-day-30-limit-4-order-hits_week-p-0`, // 首页最近7天热门新闻
    mark: ({ type, id, cid, uid }) => `${API}api.php?s=home-react-${type}-id-${id}-cid-${cid}-uid-${uid}`, // type: 收藏 love 订阅 remind id: 视频ID cid: 分类ID
    score: ({ id, sid, uid }) => `${API}api.php?s=home-react-getCmScore-id-${id}-sid-${sid}-uid-${uid}`,
    hits: ({ id, sid = 1 }) => `${API}api.php?s=home-hits-show-id-${id}-sid-${sid}-type-insert`,
    newsDetail: ({ id }) => `${API}api.php?s=home-react-newsDetail-id-${id}`, // 新闻内容接口
    newsList: ({ id, letter = '', news = '', did = '', day = '', wd = '', name = '', page = 0, limit = 30, order = 'addtime' }) =>
      `${API}api.php?s=home-react-newsList-id-${id}-letter-${letter}-news-${news}-did-${did}-day-${day}-wd-${wd}-name-${name}-limit-${limit}-order-${order}-p-${page}`, // 新闻列表接口
    newsPicList: () => `${API}api.php?s=home-react-newsList-id-211,206,205,207,208,209,212,213,221,222-limit-12-order-addtime-p-0`, // 首页新闻带图
    newsTextList: () => `${API}api.php?s=home-react-newsList-id-214,215,216,217,218,219,220,223-limit-10-order-addtime-p-0`, // 首页新闻文字
    newsAll: () => `${API}api.php?s=home-react-newsList-id-44-day-30-limit-10-order-hits_month-p-0`, // 新闻文字
    vodNewsList: ({ id, page }) => `${API}api.php?s=home-react-newsList-id-44-did-${id}-limit-10-order-addtime-p-${page}`, // 视频关联新闻列表
    slide: () => `${API}api.php?s=home-react-slide`,
    /**
     * name menu菜单 sns配置 user配置 pay支付配置 emot配置 list 各种列表
     */
    config: ({ name = '' }) => `${API}api.php?s=home-react-config${name ? `-name-${name}` : ''}`,
    storylist: ({ id, limit = 20 }) => `${API}api.php?s=home-react-storylist-id-${id}-limit-${limit}`, // 剧情列表
    storyDetail: ({ id, p = 1 }) => `${API}api.php?s=home-react-storyread-vid-${id}-p-${p}`
  }
}
