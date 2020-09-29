import { api } from 'Config'

const apiV1 = `${api}v1/`
const apiGame = `${api}game`
const apiAuth = `${api}auth/`
const apiUser = `${api}user/`
const apiReg = `https://api.5ddm.com/home.php/user-reg-`

export default {
  api: {
    login: `${apiUser}login`, // 登录
    reg: `${apiUser}reg`, // 注册
    verify: `${apiUser}verify-${Math.random()}`, // 验证码
    // 观看记录
    getplaylog: `${apiAuth}playlog`, // 获取观看记录 需登录
    addplaylog: `${apiAuth}addplaylog`, // 添加观看记录 需登录
    emptyhistory: `${apiAuth}clearplaylog`, // 清空观看记录 需登录
    delplaylog: `${apiAuth}delplaylog`, // 删除观看记录 需登录
    // id: 视频ID cid: 分类ID
    mark: `${apiAuth}mark`, // type remind订阅 和 love 收藏
    addComment: `${apiAuth}addcm`, // 添加评论
    addReptyComment: `${apiAuth}addrecm`, // 添加回复
    send: `${apiReg}send`, // 发送手机验证码
    sendemail: `${apiReg}sendemail`, // 发送邮件验证码
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
    list: `${apiV1}list/id/3`, // 列表接口
    listNoId: `${apiV1}list`, // 列表接口
    simple: `${apiV1}list/id/3`, // 首页列表接口
    playlist: `${apiV1}play`, // 播放列表 id:视频id
    player: `${apiV1}play`, // 单集 id:视频id，pid，集数
    detail: `${apiV1}detail`, // 视频详情
    detailNews: `${apiV1}vodnewslist`, // 视频关联新闻
    month: `${apiV1}month/id/3`, // 月份追番表
    newslist: `${apiV1}newsList`, // 新闻列表接口
    comment: `${apiV1}comment`, // 获取评论
    newsDetail: `${apiV1}newsDetail`, // 新闻内容接口
    slide: `${apiV1}slide`, // 获取轮播图
    storylist: `${apiV1}storylist`, // 剧情列表 902
    storyDetail: `${apiV1}storyread`, // 获取剧情详情
    digg: `${apiV1}digg`, // 视频ID type up 顶和送花 down 踩 sid 模型
    addgold: `${apiV1}addgold`, // 评分 val 分值 id 视频ID sid 视频大类

    getuserinfo: `${apiV1}userinfo`, // 获取用户信息 参数 id  val评分值
    love: `${apiV1}favoriteAndRemind`, // 查询评分，是否收藏，订阅
    cmdigg: `${apiV1}cmdigg`, // 评论顶踩
    config: `${apiV1}config`, // 网站各种配置 name menu菜单 sns配置 user配置 pay支付配置 emot配置 list 各种列表
    game: `${apiGame}game` // 游戏 order排序 wd 关键词 p 分页 limit 每页条数
  }
}
