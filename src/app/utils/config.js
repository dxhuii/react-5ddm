import { API, APIHOME } from 'Config'

export default {
  api: {
    login: `${API}login`, // 登录
    reg: `${API}reg`, // 注册
    mark: `${API}mark`, // 评分 val 分值 id 视频ID sid 视频大类
    playlist: `${API}play`, // 播放列表 id:视频id
    player: `${API}play`, // 单集 id:视频id，pid，集数
    detail: `${API}detail`, // 视频详情
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
     * wd 关键词
     */
    list: `${API}list-id-3`, // 列表接口
    listNoId: `${API}list`, // 列表接口
    newslist: `${API}newsList`, // 新闻列表接口
    // id: 视频ID cid: 分类ID
    love: `${API}love`, // 收藏
    remind: `${API}remind`, // 订阅
    score: `${API}getCmScore`, // 获取评论评分
    hits: `${APIHOME}hits-show-type-insert`,
    newsDetail: `${API}newsDetail`, // 新闻内容接口
    slide: `${API}slide`, // 获取轮播图
    /**
     * name menu菜单 sns配置 user配置 pay支付配置 emot配置 list 各种列表
     */
    config: `${API}config`, // 网站各种配置
    storylist: ({ id, limit = 20, page }) => `${API}storylist-id-${id}-limit-${limit}-p-${page}`, // 剧情列表
    storyDetail: `${API}storyread`, // 获取剧情详情
    getuserinfo: `${API}getuserinfo` // 获取用户信息 参数 id  val评分值
  }
}
