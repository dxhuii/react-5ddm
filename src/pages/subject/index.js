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
import NewsYG from '@/components/News/yugao'
import Top from '@/components/Top'
import NewsText from '@/components/Subject/NewsText'
import NewsPic from '@/components/Subject/NewsPic'
import EpList from '@/components/Subject/EpList'
import Comment from '@/components/Comment'
import Share from '@/components/Share'
import Tating from '@/components/Tating'
import Loading from '@/components/Ui/Loading'
import Meta from '@/components/Meta'

import Shell from '@/components/Shell'

import { isNumber, formatPic } from '@/utils'

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
    score: bindActionCreators(score, dispatch),
    hits: bindActionCreators(hits, dispatch)
  })
)
class Bangumi extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    info: PropTypes.object.isRequired,
    detail: PropTypes.func.isRequired,
    score: PropTypes.func.isRequired,
    sid: PropTypes.number,
    userinfo: PropTypes.object,
    cmScore: PropTypes.object,
    hits: PropTypes.func,
    isMeta: PropTypes.any,
    mark: PropTypes.func
  }

  componentDidMount() {
    const {
      match: {
        params: { id }
      },
      info,
      detail,
      score,
      sid = 1,
      userinfo: { userid },
      cmScore,
      hits
    } = this.props
    if (!info || !info.data) {
      detail({ id })
    }
    if (!cmScore || !cmScore.data) {
      score({ id, sid, uid: userid })
    }
    hits({ id, sid })
  }

  async addMark(type, id, cid, uid) {
    console.log(type, id, cid, uid)
    const { mark, score } = this.props
    let [, data] = await mark({ type, id, cid, uid })
    if (data.rcode === 1) {
      score({ id, sid: 1, uid })
    }
  }

  render() {
    const {
      info: { data = {}, loading },
      userinfo: { userid },
      cmScore = {}
    } = this.props
    const {
      id,
      cid,
      title,
      content,
      listName,
      listNameBig,
      pic = '',
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
      repairtitle,
      mcid = [],
      original = [],
      director = [],
      storylist = [],
      newsTextlist = [],
      newsPiclist = []
    } = data
    const shareConfig = {
      pic,
      title: `${title}${language ? `(${language})` : ''} - ${listName}${listNameBig}`,
      desc: content,
      url: `/subject/${id}`
    }
    const rePic = formatPic(pic, 'orj360')
    const star = (cmScore.data || {}).star || {}
    const comment = (cmScore.data || {}).comment || {}
    const { loveid, remindid } = star
    const { curpingfen } = star
    return (
      <Fragment>
        <div className="warp-bg">
          {loading ? <Loading /> : null}
          <Meta title={`${title}${repairtitle ? `_${repairtitle}` : ''} - ${listName}${listNameBig}`}>
            <meta property="og:locale" content="zh_CN" />
            <meta property="og:type" content="videolist" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={content} />
            <meta property="og:image" content={rePic} />
            <meta property="og:url" content={`/subject/${id}`} />
            <meta property="og:video" content={`/play/${id}/1`} />
            <meta property="og:site_name" content={'9站'} />
            <meta name="description" content={content} />
            <meta name="keywords" content={keywords} />
          </Meta>
          <div styleName="detail">
            <div styleName="detail-blur" style={{ backgroundImage: `url(${rePic})` }} />
            <div styleName="detail-con" className="wp clearfix">
              <div styleName="detail-pic">{pic ? <img src={rePic} /> : null}</div>
              <div styleName="detail-info">
                <h1>
                  {title}
                  <span>
                    <a>{listName}</a>
                    {mcid.length > 0 ? mcid.map(item => (item.title ? <a key={item.id}>{item.title}</a> : '')) : null}
                  </span>
                </h1>
                {aliases ? <p styleName="text">别名：{aliases}</p> : null}
                <ul styleName="detail-info__count">
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
                <div styleName="detail-tool">
                  <div styleName={`detail-tool__on ${remindid ? 'active' : ''}`} onClick={() => this.addMark('remind', id, cid, userid)}>
                    <i className="iconfont">&#xe6bd;</i>
                    {remindid ? '已追番' : '追番'}
                  </div>
                  <div styleName={`detail-tool__on ${loveid ? 'active' : ''}`} onClick={() => this.addMark('love', id, cid, userid)}>
                    <i className="iconfont">&#xe66a;</i>
                    {loveid ? '已收藏' : '收藏'}
                  </div>
                  <div styleName="detail-tool__share">
                    <Share data={shareConfig} />
                  </div>
                </div>
              </div>
              <div styleName="detail-score">{curpingfen ? <Tating data={curpingfen} /> : null}</div>
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
                    <Link to={`/subject/${id}/news`}>新闻花絮</Link>
                  </li>
                ) : null}
                {actorId ? (
                  <li>
                    <a>演员角色</a>
                  </li>
                ) : null}
                {storyId ? (
                  <li>
                    <Link to={`/episode/${storyId}`}>分集剧情</Link>
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
              <div className="mt10">
                <div styleName="title">
                  <h2>预告片·OP·ED·BGM·MAD·CM·特典 · · · · · ·</h2>
                </div>
                <NewsText data={newsTextlist} />
              </div>
            ) : null}
            {storyId && storylist.length > 0 ? (
              <div styleName="ep">
                <div styleName="title">
                  <h2>分集剧情</h2>
                </div>
                <EpList id={storyId} data={storylist} />
              </div>
            ) : null}
            {newsPiclist.length > 0 ? (
              <div>
                <div styleName="title">
                  <h2>新闻花絮</h2>
                </div>
                <NewsPic data={newsPiclist} />
              </div>
            ) : null}
            <div className={`${!(newsTextlist.length > 0 && storyId && newsPiclist.length > 0) ? 'mt10' : 'mt20'}`}>
              <div styleName="title">
                <h2>相关动漫</h2>
              </div>
              {id ? <DetailActor actor={actor ? actor.map(item => item.title).join(',') : ''} no={id} /> : null}
            </div>
            <div className="mt20">
              <div styleName="title">
                <h2>评论</h2>
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
            <div styleName="box" className="mt20">
              <Top name="topListAll" title="30天热门动漫" sty={{ padding: '10px 0' }} />
            </div>
            <div styleName="box" className="mt20">
              <NewsYG name="newsAll" isCate={false} title="30天热门资讯" isType={true} sty={{ padding: '10px 0' }} />
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Bangumi
