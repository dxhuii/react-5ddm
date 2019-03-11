import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { detail, score } from '@/store/actions/detail'
import { like } from '@/store/actions/mark'
import { hits } from '@/store/actions/hits'
import { getDetail, getScore } from '@/store/reducers/detail'
import { getUserInfo } from '@/store/reducers/user'

import Loading from '@/components/Ui/Loading'
import Comment from '@/components/Comment'
import DetailActor from '@/components/DetailActor'
import SideBar from '@/components/SideBar'
import EpList from '@/components/Subject/EpList'
import NewsPic from '@/components/Subject/NewsPic'
import NewsText from '@/components/Subject/NewsText'
import PlayList from '@/components/PlayList'
import Share from '@/components/Share'
import Tating from '@/components/Tating'
import Modal from '@/components/Modal'
import Ads from '@/components/Ads'
import Sign from '@/components/Sign'
import Meta from '@/components/Meta'

import Toast from '@/components/Toast'

import Shell from '@/components/Shell'

import { isNumber, formatPic, isMobile } from '@/utils'
import { IS9, DOMAIN_NAME, ISPLAY, NAME } from 'Config'

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
    like: bindActionCreators(like, dispatch),
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
    like: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      isSign: 'signIn'
    }
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

    const {
      like,
      score,
      userinfo: { userid },
      cmScore
    } = this.props
    const csData = cmScore.data || {}
    const { loveid, remindid } = csData
    if (userid) {
      let [, data] = await like({ type, id, cid, uid })
      if (data.rcode === 1) {
        score({ id, sid: 1, uid })
        Toast.success(type === 'remind' ? (remindid ? '取消追番' : '追番成功') : loveid ? '取消收藏' : '收藏成功')
      }
    } else {
      this.setState({
        visible: true
      })
    }
  }

  showModal = () => {
    this.setState({
      visible: true
    })
  }

  onType = isSign => {
    this.setState({
      isSign,
      visible: true
    })
  }

  closeModal = () => {
    this.setState({
      visible: false
    })
  }

  showPan(pan, uid) {
    if (pan) {
      return (IS9 && uid) || !IS9 ? (
        <li>
          <a href={pan} target="_blank" rel="noopener noreferrer">
            网盘下载
          </a>
        </li>
      ) : (
        <li>
          网盘下载
          <div onClick={this.showModal}>登录后可用</div>
        </li>
      )
    }
  }

  getName(id) {
    let name = ''
    switch (id) {
      case 201:
        name = 'tv'
        break
      case 202:
        name = 'ova'
        break
      case 203:
        name = 'juchang'
        break
      case 4:
        name = 'tebie'
        break
      case 204:
        name = 'zhenren'
        break
      case 35:
        name = 'qita'
        break
      default:
        name = 'list'
        break
    }
    return name
  }

  render() {
    const { visible, isSign } = this.state
    const {
      info: { data = {}, loading },
      match: { url },
      userinfo: { userid },
      cmScore = {},
      score
    } = this.props
    const {
      id,
      cid,
      title,
      content = '',
      listName,
      listNameBig,
      pic = '',
      actor,
      area,
      aliases,
      gold,
      filmtime,
      total,
      language = '',
      company,
      keywords,
      website,
      updateDate,
      // hits,
      tvcont,
      status,
      year,
      storyId,
      actorId,
      repairtitle,
      pan,
      vod_pantitle,
      copyright,
      mcid = [],
      original = [],
      director = [],
      storylist = [],
      newsTextlist = [],
      newsPiclist = []
    } = data
    const rePic = formatPic(pic, 'orj360')
    const csData = cmScore.data || {}
    const { loveid, remindid, star, comment = [] } = csData
    const reContent = `${content.substring(0, 120)}${content.length > 120 ? '...' : ''}`
    const shareConfig = {
      pic,
      title: `#${title}#${language ? `(${language})` : ''} - ${listName}${listNameBig} - #${NAME.split('_').join('##')}#`,
      desc: reContent,
      url: `/subject/${id}`
    }
    if ((copyright === 'stop' && !userid && !ISPLAY) || !isMobile) {
      if (typeof window === 'undefined') {
        return
      }
      window.location.href = '/404'
    }
    return (
      <Fragment>
        <div className="warp-bg">
          {loading ? <Loading /> : null}
          <Meta
            title={`${title}全集在线观看${repairtitle && repairtitle !== '讨论帖' ? `_${repairtitle}` : ''}${
              vod_pantitle || DOMAIN_NAME === 'dddm.tv' ? '_百度云盘下载' : ''
            } - ${listName}${listNameBig}`}
          >
            <meta name="description" content={`${title}动画全集由${reContent}`} />
            <meta
              name="keywords"
              content={`${title},${title}动漫,${title}下载${
                vod_pantitle ? `,${title}百度云盘下载` : ''
              },${title}全集,${title}动画片,${title}在线观看${keywords ? `,${keywords}` : ''}`}
            />
            <meta property="og:locale" content="zh_CN" />
            <meta property="og:type" content="videolist" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={reContent} />
            <meta property="og:image" content={rePic} />
            <meta property="og:url" content={`/subject/${id}`} />
            <meta property="og:video" content={`/play/${id}/1`} />
            <meta property="og:site_name" content={NAME} />
            <meta property="og:video:score" content={gold} />
            <meta property="og:video:actor" content={actor ? actor.map(item => item.title).join(',') : ''} />
            <meta property="og:video:area" content={area} />
            <meta property="og:video:class" content={`${listName}${mcid.length > 0 ? mcid.map(item => item.title).join(',') : ''}`} />
            <meta property="og:video:language" content={language} />
            <meta property="og:video:update_date" content={updateDate} />
            <meta property="og:video:content_type" content="6" />
          </Meta>
          <div styleName="detail">
            <div styleName="detail-blur" style={{ backgroundImage: `url(${rePic})` }} />
            <div styleName="detail-con" className="wp clearfix">
              <div styleName="detail-pic">{pic ? <img src={rePic} /> : null}</div>
              <div styleName="detail-info">
                <div styleName="detial-title">
                  <h1>{title}</h1>
                  <span>
                    <Link to={`/type/${this.getName(cid)}/-/-/-/-/-/-/`}>{listName}</Link>
                    {mcid.length > 0
                      ? mcid.map(item =>
                          item.title ? (
                            <Link key={item.id} to={`/type/${this.getName(cid)}/${item.id}/-/-/-/-/-/`}>
                              {item.title}
                            </Link>
                          ) : null
                        )
                      : null}
                  </span>
                </div>
                {aliases ? <p>别名：{aliases}</p> : null}
                <ul styleName="detail-info__count">
                  {/* <li>
                    热度
                    <span>{hits}</span>
                  </li> */}
                </ul>
                {filmtime || status || total ? (
                  <p>
                    {filmtime ? <span>{filmtime} 播出</span> : <span>{year}年</span>}
                    {isNumber(status) ? <span> 更新至{status}话</span> : <span> {status}</span>}
                    {tvcont ? <span>，{tvcont}</span> : null}
                    {total ? <span>，共{total}话</span> : null}
                  </p>
                ) : null}
                <p>
                  {language ? <span style={{ marginRight: 30 }}>语言：{language}</span> : null}
                  {area ? <span>地区：{area}</span> : null}
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
                  <div styleName="detail-tool__on share" onClick={this.onShare}>
                    <i className="iconfont">&#xe655;</i>分享
                  </div>
                  <div styleName="detail-tool__share">
                    <Share data={shareConfig} />
                  </div>
                </div>
              </div>
              {star ? (
                <div styleName="detail-score">
                  <Tating data={star} id={id} uid={userid} sid={1} score={score} />
                </div>
              ) : null}
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
                {this.showPan(pan, userid)}
              </ul>
            </div>
          </div>
        </div>
        {IS9 && copyright === 'banquan' ? (
          <div styleName="copyright">根据国家相关部门规定，本动画不准上架，请支持正版观看，谢谢</div>
        ) : (
          <PlayList key="playlist" />
        )}
        <div className="wp">
          {isMobile() ? (
            <div className="mt20">
              <Ads id={26} url={url} />
            </div>
          ) : (
            <Ads id={22} />
          )}
        </div>
        <div className="mt20 clearfix wp">
          <div className="fl box pb20 left">
            {newsTextlist.length > 0 ? (
              <div className="mt10">
                <div styleName="title">
                  <h2>预告片·OP·ED·BGM·MAD·CM·特典 · · · · · ·</h2>
                </div>
                <NewsText data={newsTextlist} />
              </div>
            ) : null}
            {content ? (
              <div className="mt10">
                <div styleName="title">
                  <h2>简介</h2>
                </div>
                <div styleName="detail-content" className="mt10">
                  {content}
                </div>
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
              <div className="mt10">
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
              <Comment data={comment} />
            </div>
          </div>
          <div className="fr right">
            <div className="box pb20">
              <div styleName="title">
                <h2>角色声优</h2>
              </div>
              {actor ? actor.map((item, index) => <p key={index}>{item.title}</p>) : <p>暂无</p>}
            </div>
            <div className="box pb20 mt20">
              <div styleName="title">
                <h2>STAFF</h2>
              </div>
              {original.length > 0 ? <p>原作：{original.map(item => item.title)}</p> : null}
              {director.length > 0 ? (
                <p>
                  导演：
                  {director.map((item, index) => (
                    <span key={`${item.title}_${index}`}>{item.title}</span>
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
            <div className="mt20">
              <SideBar />
            </div>
          </div>
        </div>
        <div className="wp">{!isMobile() && <Ads id={21} />}</div>
        <Modal visible={visible} showModal={this.showModal} closeModal={this.closeModal}>
          <Sign isSign={isSign} onType={val => this.onType(val)} />
        </Modal>
      </Fragment>
    )
  }
}

export default Bangumi
