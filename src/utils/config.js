import { API } from 'Config'

export default {
  api: {
    login: `${API}api.php?s=home-react-login`,
    addScore: `${API}api.php?s=home-react-addScore`, // 评分 val 分值 id 视频ID sid 视频大类
    getVodId: ({ pinyin }) => `${API}api.php?s=home-react-getVodId&pinyin=${pinyin}`, // 根据拼音获取视频ID
    playlist: ({ id, pinyin }) => `${API}api.php?s=home-react-play${id ? `&id=${id}` : pinyin ? `&pinyin=${pinyin}` : ''}&react=1`, // 播放列表 id:视频id
    player: ({ id, pid }) => `${API}api.php?s=home-react-play-id-${id}-pid-${pid}`, // 单集 id:视频id，pid，集数
    detail: ({ id, pinyin }) => `${API}api.php?s=home-react-detail${id ? `&id=${id}` : pinyin ? `&pinyin=${pinyin}` : ''}`, // 视频详情
    week: ({ limit }) => `${API}api.php?s=home-react-Week&limit=${limit}`, // 每周追番
    search: ({ q, limit }) => `${API}api.php?s=home-react-SearchAssociation&q=${q}&limit=${limit}`, // 搜索
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
    mark: ({ type, id, cid, uid }) => `${API}api.php?s=home-react-${type}-id-${id}-cid-${cid}-uid-${uid}`, // type: 收藏 love 订阅 remind id: 视频ID cid: 分类ID
    score: ({ id, sid, uid }) => `${API}api.php?s=home-react-getCmScore-id-${id}-sid-${sid}-uid-${uid}`,
    hits: ({ id, sid = 1 }) => `${API}api.php?s=home-hits-show-id-${id}-sid-${sid}-type-insert`,
    newsDetail: ({ id }) => `${API}api.php?s=home-react-newsDetail-id-${id}`, // 新闻内容接口
    newsList: ({ id, letter = '', news = '', did = '', day = '', wd = '', name = '', page = 0, limit = 30, order = 'addtime' }) =>
      `${API}api.php?s=home-react-newsList-id-${id}-letter-${letter}-news-${news}-did-${did}-day-${day}-wd-${wd}-name-${name}-limit-${limit}-order-${order}-p-${page}`, // 新闻列表接口
    slide: () => `${API}api.php?s=home-react-slide`,
    /**
     * name menu菜单 sns配置 user配置 pay支付配置 emot配置 list 各种列表
     */
    config: ({ name = '' }) => `${API}api.php?s=home-react-config${name ? `-name-${name}` : ''}`,
    storylist: ({ id, limit = 20 }) => `${API}api.php?s=home-react-storylist-id-${id}-limit-${limit}`, // 剧情列表
    storyDetail: ({ id, p = 1 }) => `${API}api.php?s=home-react-storyread-vid-${id}-p-${p}`
  }
}
