import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { detail } from '@/store/actions/detail'
import { mark } from '@/store/actions/mark'
import { score } from '@/store/actions/score'
import { hits } from '@/store/actions/hits'
import { getDetail, getScore } from '@/store/reducers/detail'
import { getUserInfo } from '@/store/reducers/user'

import PlayList from '@/components/PlayList'
import DetailActor from '@/components/DetailActor'
import Comment from '@/components/Comment'
import Load from '@/components/Ui/Load'
import Meta from '@/components/Meta'

import Shell from '@/components/Shell'

import { isNumber } from '@/utils'

import './style.scss'
@Shell
@withRouter
@connect(
  (state, props) => ({
    info: getDetail(state, props.match.params.id),
    userinfo: getUserInfo(state),
    cmScore: getScore(state, props.match.params.id, 1, getUserInfo(state).userid || 0)
  }),
  dispatch => ({
    detail: bindActionCreators(detail, dispatch),
    mark: bindActionCreators(mark, dispatch),
    getCm: bindActionCreators(score, dispatch),
    hits: bindActionCreators(hits, dispatch)
  })
)
class Bangumi extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    info: PropTypes.object.isRequired,
    detail: PropTypes.func.isRequired,
    getCm: PropTypes.func.isRequired,
    sid: PropTypes.number,
    userinfo: PropTypes.object,
    cmScore: PropTypes.object,
    hits: PropTypes.func,
    isMeta: PropTypes.any
  }

  componentDidMount() {
    const {
      match: {
        params: { id }
      },
      info,
      detail,
      getCm,
      sid = 1,
      userinfo: { userid },
      cmScore,
      hits
    } = this.props
    if (!info || !info.data) {
      detail({
        id
      })
    }
    if (!cmScore || !cmScore.data) {
      getCm({
        id,
        sid,
        uid: userid
      })
    }
    hits({
      id,
      sid
    })
  }

  addMark(type, id, cid, uid) {
    console.log(type, id, cid, uid)
  }

  render() {
    const {
      info: { data = {}, loading },
      userinfo: { userid },
      cmScore
    } = this.props
    const {
      id,
      cid,
      title,
      content,
      listName,
      listNameBig,
      pic,
      actor,
      area,
      aliases,
      gold,
      filmtime,
      total,
      language,
      company,
      keywords,
      website,
      updateDate,
      hits,
      tvcont,
      status,
      year,
      storyId,
      actorId,
      mcid = [],
      original = [],
      director = [],
      storylist = [],
      newsTextlist = [],
      newsPiclist = []
    } = data
    console.log(cmScore, 'cmScore')
    return (
      <Fragment>
        <div className="warp-bg">
          {loading ? <Load /> : null}
          <Meta title={`${title}${language ? `(${language})` : ''} - ${listName}${listNameBig}`}>
            <meta property="og:locale" content="zh_CN" />
            <meta property="og:type" content="videolist" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={content} />
            <meta property="og:image" content={pic} />
            <meta property="og:url" content={`/subject/${id}`} />
            <meta property="og:video" content={`/play/${id}/1`} />
            <meta property="og:site_name" content={'9站'} />
            <meta name="description" content={content} />
            <meta name="keywords" content={keywords} />
          </Meta>
          <div styleName="detail">
            <div styleName="detail-blur" style={{ backgroundImage: `url(${pic})` }} />
            <div styleName="detail-info__con" className="wp clearfix">
              <div styleName="detail-info__pic">
                <img src={pic} />
              </div>
              <div styleName="detail-info__info">
                <h1>
                  {title}
                  <span>
                    <a>{listName}</a>
                    {mcid.length > 0 ? mcid.map(item => (item.title ? <a key={item.id}>{item.title}</a> : '')) : null}
                  </span>
                </h1>
                <div styleName="detail-box">
                  <div styleName="detail-info_list">
                    {aliases ? <p styleName="text">别名：{aliases}</p> : null}
                    <ul styleName="play-num">
                      <li>
                        热度
                        <span>{hits}</span>
                      </li>
                    </ul>
                    {filmtime || status || total ? (
                      <p>
                        {filmtime ? <span>{filmtime} 开播</span> : <span>{year}年</span>}
                        {isNumber(status) ? <span>，更新至{status}话</span> : <span>，{status}</span>}
                        {tvcont ? <span>，{tvcont}</span> : null}
                        {total ? <span>，共{total}话</span> : null}
                      </p>
                    ) : null}
                    <p>
                      <span style={{ marginRight: 30 }}>语言：{language}</span>
                      <span>地区：{area}</span>
                    </p>
                    <p>更新时间：{updateDate}</p>
                  </div>
                  <div styleName="detail-info__score"> {gold} </div>
                </div>
              </div>
              <div styleName="detail-love active" onClick={() => this.addMark('love', id, cid, userid)}>
                <i className="iconfont">&#xe66a;</i>收藏
              </div>
              <div styleName="detail-remind" onClick={() => this.addMark('remind', id, cid, userid)}>
                <i className="iconfont">&#xe6bd;</i>追番
              </div>
            </div>
          </div>
          <div styleName="detail-nav">
            <div className="wp">
              <ul>
                <li styleName="active">
                  <a>作品详情</a>
                </li>
                {newsTextlist.length || newsPiclist.length ? (
                  <li>
                    <a>新闻花絮</a>
                  </li>
                ) : null}
                {actorId ? (
                  <li>
                    <a>演员角色</a>
                  </li>
                ) : null}
                {storyId ? (
                  <li>
                    <Link to={`/episode/${id}/1`}>分集剧情</Link>
                  </li>
                ) : null}
                <li>
                  <Link to={`/time/${id}`}>播出时间</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <PlayList key="playlist" />
        <div className="mt20 clearfix" styleName="wp">
          <div styleName="left" className="fl">
            {newsTextlist.length > 0 ? (
              <div className="pt15">
                <div styleName="title">
                  <h2>预告片&OP&ED&BGM&MAD&CM&特典 · · · · · ·</h2>
                </div>
                <ul styleName="d-yugao">
                  <li styleName="top">
                    <span styleName="time">发布时间</span>
                    <span styleName="name">视频名称</span>
                    <span styleName="clarity">清晰度</span>
                    <span styleName="play">播放</span>
                    <span styleName="source">来源</span>
                  </li>
                  {newsTextlist.map(item => (
                    <li key={item.id}>
                      <span styleName="time">{item.addtime}</span>
                      <span styleName="name">
                        <Link to={`/article/${item.id}`} title={item.title}>
                          {item.title}
                        </Link>
                        <em>{item.playtime}</em>
                      </span>
                      <span styleName="clarity">{item.clarity}</span>
                      <span styleName="play">
                        <Link to={`/article/${item.id}`} title={item.title}>
                          <em>播放</em>
                        </Link>
                      </span>
                      <span styleName="source">
                        <i className={`playicon ${item.playname}`} />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {storyId && storylist.length > 0 ? (
              <div styleName="ep">
                <div styleName="title">
                  <h2>分集剧情</h2>
                </div>
                <ul styleName="eplist" className="mt20">
                  {storylist.map(item => (
                    <li key={item.pid}>
                      <h4>
                        <Link to={`/episode/${id}/${item.pid}`}>
                          {item.name} {item.title}
                        </Link>
                      </h4>
                      <p>{item.content}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {newsPiclist.length > 0 ? (
              <div>
                <div styleName="title">
                  <h2>新闻花絮</h2>
                </div>
                <ul styleName="newslist">
                  {newsPiclist.map(item => (
                    <li key={item.id}>
                      <Link to={`/article/${item.id}`}>
                        <img src={item.pic} alt={item.title} />
                        <div styleName="mark">
                          <p>{item.title}</p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            <div className="mt20">
              <div styleName="title">
                <h2>相关动漫</h2>
              </div>
              {id ? <DetailActor actor={actor ? actor.map(item => item.title).join(',') : ''} no={id} /> : null}
            </div>
            <div className="mt20">
              <div styleName="title">
                <h2>相关动漫</h2>
              </div>
              <Comment />
            </div>
          </div>
          <div styleName="right" className="fr">
            <div styleName="box">
              <div styleName="title">
                <h2>角色声优</h2>
              </div>
              {actor ? actor.map((item, index) => <p key={index}>{item.title}</p>) : <p>暂无</p>}
            </div>
            <div styleName="box" className="mt20">
              <div styleName="title">
                <h2>STAFF</h2>
              </div>
              {original.length > 0 ? <p>原作：{original.map(item => item.title)}</p> : null}
              {director.length > 0 ? (
                <p>
                  导演：
                  {director.map(item => (
                    <span key={item.title}>{item.title}</span>
                  ))}
                </p>
              ) : null}
              {company ? <p>制作：{company}</p> : null}
              {website ? (
                <p>
                  官网：
                  <a href={website} target="_blank" rel="noopener noreferrer">
                    {website}
                  </a>
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Bangumi
