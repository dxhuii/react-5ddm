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

import PlayList from '@/components/Play/PlayList'
import Meta from '@/components/Meta'

import Shell from '@/components/Shell'

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
      isMeta,
      userinfo: { userid }
    } = this.props
    const {
      id,
      cid,
      title,
      content,
      pic,
      actor,
      area,
      aliases,
      gold,
      filmtime,
      total,
      director,
      type,
      language,
      company,
      keywords,
      mcid,
      original,
      website,
      updateDate,
      tvcont,
      storyId,
      actorId,
      storylist = [],
      newsTextlist = [],
      newsPiclist = []
    } = data
    return (
      <Fragment>
        <div className="warp-bg">
          {loading ? <div> loading... </div> : null}
          <Meta title={title}>
            <meta property="og:locale" content="zh_CN" />
            <meta property="og:type" content="videolist" />
            <meta property="og:title" content={title} /> <meta property="og:description" content={content} />
            <meta property="og:image" content={pic} />
            <meta property="og:url" content={`/subject/${id}`} /> <meta property="og:video" content={`/play/${id}/1`} />
            <meta property="og:site_name" content={'9站'} />
            <meta name="description" content={content} /> <meta name="keywords" content={title} />
          </Meta>
          <div styleName="detail">
            <div styleName="detail-blur" style={{ backgroundImage: `url(${pic})` }} />
            <div styleName="detail-info__con" className="wp clearfix">
              <div styleName="detail-info__pic">
                <img src={pic} />
              </div>
              <div styleName="detail-info__info">
                <h1>{title}</h1>
                <p>{aliases}</p>
                {total ? <p>{total}</p> : null}
                {filmtime ? <p>{filmtime} 开播</p> : null}
                <p>{director ? director.map(item => <span key={item.title}>{item.title}</span>) : null}</p>
                <p>{type}</p>
                <p>{language}</p>
                <p>{actor ? actor.map(item => <span key={item.title}>{item.title}</span>) : null}</p>
                <p>{area}</p>
              </div>
              <div styleName="detail-info__score"> {gold} </div>
              <div styleName="detail-love" onClick={() => this.addMark('love', id, cid, userid)}>
                <i className="iconfont">&#xe66a;</i>收藏
              </div>
              <div styleName="detail-remind" onClick={() => this.addMark('remind', id, cid, userid)}>
                <i className="iconfont">&#xe6bd;</i>追番
              </div>
            </div>
          </div>
          <ul styleName="detail-nav" className="tac">
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
        <div className="wp mt20">
          <PlayList key="playlist" />
          {storyId ? (
            <div styleName="ep" className="mt20">
              <h2>{title}的剧情</h2>
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
        </div>
      </Fragment>
    )
  }
}

export default Bangumi
