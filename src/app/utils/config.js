import { API } from 'Config'

const apiReact = `${API}home-mapi-`
const apiGame = `${API}home-game`
const apiHomeUser = `${API}home-user-`
const apiUser = `${API}user-api-`
const apiUserReg = `${API}user-reg-`

export default {
  api: {
    login: `${apiUser}login`, // 登录
    reg: `${apiUser}reg`, // 注册
    verify: `${apiUser}verify-${Math.random()}`, // 验证码

    getuserinfo: `${apiHomeUser}getuserinfo`, // 获取用户信息 参数 id  val评分值
    // 观看记录
    getplaylog: `${apiHomeUser}playlog`, // 获取观看记录 需登录
    addplaylog: `${apiHomeUser}addplaylog`, // 添加观看记录 需登录
    emptyhistory: `${apiHomeUser}clearplaylog`, // 清空观看记录 需登录
    delplaylog: `${apiHomeUser}delplaylog`, // 删除观看记录 需登录
    // id: 视频ID cid: 分类ID
    mark: `${apiHomeUser}mark`, // type remind订阅 和 love 收藏
    love: `${apiHomeUser}favoriteAndRemind`, // 查询评分，是否收藏，订阅
    addComment: `${apiHomeUser}addcm`, // 添加评论
    addReptyComment: `${apiHomeUser}addrecm`, // 添加回复

    send: `${apiUserReg}send`, // 发送手机验证码
    sendemail: `${apiUserReg}sendemail`, // 发送邮件验证码
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
    list: `${apiReact}list/id/3`, // 列表接口
    listNoId: `${apiReact}list`, // 列表接口
    playlist: `${apiReact}play`, // 播放列表 id:视频id
    player: `${apiReact}play`, // 单集 id:视频id，pid，集数
    detail: `${apiReact}detail`, // 视频详情
    detailNews: `${apiReact}vodnewslist`, // 视频关联新闻
    month: `${apiReact}month/id/3`, // 月份追番表
    newslist: `${apiReact}newsList`, // 新闻列表接口
    comment: `${apiReact}comment`, // 获取评论
    newsDetail: `${apiReact}newsDetail`, // 新闻内容接口
    slide: `${apiReact}slide`, // 获取轮播图
    storylist: `${apiReact}storylist`, // 剧情列表 902
    storyDetail: `${apiReact}storyread`, // 获取剧情详情
    digg: `${apiReact}digg`, // 视频ID type up 顶和送花 down 踩 sid 模型
    addgold: `${apiReact}addgold`, // 评分 val 分值 id 视频ID sid 视频大类
    /**
     * name menu菜单 sns配置 user配置 pay支付配置 emot配置 list 各种列表
     */
    config: `${apiReact}config`, // 网站各种配置
    // 游戏
    game: `${apiGame}` // order排序 wd 关键词 p 分页 limit 每页条数
  }
}
