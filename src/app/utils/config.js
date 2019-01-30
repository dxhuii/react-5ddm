import { API } from 'Config'

const apiReact = `${API}api.php?s=home-react-`
const apiHome = `${API}api.php?s=home-`

export default {
  api: {
    login: `${apiReact}login`, // 登录
    reg: `${apiReact}register`, // 注册
    mark: `${apiReact}mark`, // 评分 val 分值 id 视频ID sid 视频大类
    playlist: `${apiReact}play`, // 播放列表 id:视频id
    player: `${apiReact}play`, // 单集 id:视频id，pid，集数
    detail: `${apiReact}detail`, // 视频详情
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
    list: `${apiReact}list-id-3`, // 列表接口
    listNoId: `${apiReact}list`, // 列表接口
    month: `${apiReact}month-id-3`, // 月份追番表
    newslist: `${apiReact}newsList`, // 新闻列表接口
    // id: 视频ID cid: 分类ID
    love: `${apiReact}love`, // 收藏
    remind: `${apiReact}remind`, // 订阅
    score: `${apiReact}getCmScore`, // 获取评论评分
    hits: `${apiHome}hits-show-type-insert`,
    newsDetail: `${apiReact}newsDetail`, // 新闻内容接口
    slide: `${apiReact}slide`, // 获取轮播图
    /**
     * name menu菜单 sns配置 user配置 pay支付配置 emot配置 list 各种列表
     */
    config: `${apiReact}config`, // 网站各种配置
    storylist: ({ id, limit = 20, page }) => `${apiReact}storylist-id-${id}-limit-${limit}-p-${page}`, // 剧情列表
    storyDetail: `${apiReact}storyread`, // 获取剧情详情
    getuserinfo: `${apiReact}getuserinfo`, // 获取用户信息 参数 id  val评分值
    verify: `${apiReact}verify-${Math.random()}`, // 验证码
    ads: `${apiReact}getAds` // 广告
  }
}
