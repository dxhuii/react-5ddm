import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { detail, score } from '@/store/actions/detail'
import { like } from '@/store/actions/mark'
import { getDetail } from '@/store/reducers/detail'
import { getUserInfo } from '@/store/reducers/user'

import Loading from '@/components/Ui/Loading'
import SideBar from '@/components/SideBar'
import Share from '@/components/Share'
import PlayList from '@/components/PlayList'
import DetailActor from '@/components/Subject/DetailActor'
import HotWeek from '@/components/Subject/HotWeek'
import EpList from '@/components/Subject/EpList'
import NewsPic from '@/components/Subject/NewsPic'
import NewsText from '@/components/Subject/NewsText'
import Comment from '@/components/Comment'
import Tating from '@/components/Tating'
import Modal from '@/components/Modal'
import Sign from '@/components/Sign'
import Toast from '@/components/Toast'
import Ads from '@/components/Ads'

import Meta from '@/components/Meta'
import Shell from '@/components/Shell'

import { isNumber, formatPic } from '@/utils'
import { DOMAIN_NAME, NAME, DOMAIN } from 'Config'

import './style.scss'
@Shell
@withRouter
@connect(
  (state, props) => ({
    info: getDetail(state, props.match.params.id),
    userinfo: getUserInfo(state),
    cmScore: getDetail(state, `score_${props.match.params.id}`)
  }),
  dispatch => ({
    detail: bindActionCreators(detail, dispatch),
    like: bindActionCreators(like, dispatch),
    score: bindActionCreators(score, dispatch)
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
    location: PropTypes.object,
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
    this.getData()
  }

  componentDidUpdate(prevProps) {
    // 当 url 参数参数发生改变时，重新进行请求
    let oldId = prevProps.match.params.id
    let newId = this.props.match.params.id
    if (newId !== oldId) this.getData()
  }

  getData = () => {
    const {
      match: {
        params: { id }
      },
      info,
      detail,
      score,
      sid = 1,
      userinfo: { userid },
      cmScore
    } = this.props
    if (!info || !info.data) {
      detail({ id })
    }
    if (!cmScore || !cmScore.data) {
      score({ id, sid, uid: userid })
    }
  }

  async addMark(type, id, cid, uid) {
    // console.log(type, id, cid, uid)

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
      userinfo: { userid },
      cmScore = {},
      score,
      location
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
      jump,
      tvcont,
      status,
      year,
      storyId,
      actorId,
      repairtitle,
      pan,
      vod_pantitle,
      mcid = [],
      original = [],
      director = [],
      storylist = [],
      newsTextlist = [],
      newsPiclist = [],
      playlist = []
    } = data
    const rePic = formatPic(pic, 'orj360')
    const csData = cmScore.data || {}
    const { loveid, remindid, star, comment = [] } = csData
    const reContent = `${content.substring(0, 120)}${content.length > 120 ? '...' : ''}`
    const shareConfig = {
      pic,
      title: `#${title}#${language ? `(${language})` : ''} - ${listName}${listNameBig} - #${NAME}# @99496动漫网`,
      desc: reContent,
      url: `/subject/${id}`
    }
    if (jump && !(typeof window === 'undefined')) {
      window.location.href = jump
    }
    if (loading || !data.title) return <Loading />
    return (
      <>
        <div className="warp-bg">
          <Meta
            title={`${title}全集在线观看${repairtitle && repairtitle !== '讨论帖' ? `_${repairtitle}` : ''}${
              vod_pantitle || DOMAIN_NAME === 'dddm.tv' ? '_百度云盘下载' : ''
            } - ${listName}${listNameBig}`}
          >
            <meta name="description" content={`${title}动画全集由${reContent}`} />
            <meta
              name="keywords"
              content={`${title},${title}动漫,${title}下载${vod_pantitle ? `,${title}百度云盘下载` : ''},${title}全集,${title}动画片,${title}在线观看${keywords ? `,${keywords}` : ''}`}
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
                <ul styleName="detail-info__count">{/* <li>热度<span>{hits}</span></li> */}</ul>
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
                <p styleName="detail-update">更新时间：{updateDate}</p>
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
                    <Share data={shareConfig} location={location} />
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
                {pan ? (
                  <li>
                    <a href={pan} target="_blank" rel="noopener noreferrer">
                      网盘下载
                    </a>
                  </li>
                ) : null}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt20">
          <Ads id={3} />
        </div>
        {playlist.length > 0 ? <PlayList data={playlist} /> : null}
        <div className="wp">
          <Ads id={4} />
        </div>
        <div className="mt20 clearfix wp" styleName="detail-bottom">
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
                  <p>
                    《{title}》动漫的网址：{DOMAIN}/subject/{id}
                  </p>
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
            <div className="mt10">
              <div styleName="title">
                <h2>相关动漫</h2>
              </div>
              {id ? <DetailActor actor={actor ? actor.map(item => item.title).join(',') : ''} no={id} /> : null}
            </div>
            {newsPiclist.length > 0 ? (
              <div className="mt10">
                <div styleName="title">
                  <h2>新闻花絮</h2>
                </div>
                <NewsPic data={newsPiclist} />
              </div>
            ) : null}
            <div className={`${newsPiclist.length > 0 ? 'mt20' : 'mt10'}`}>
              <div styleName="title">
                <h2>小伙伴还在看(=￣ω￣=)（一周热门）</h2>
              </div>
              <HotWeek />
            </div>
            {comment.length > 0 ? (
              <div className="mt20">
                <div styleName="title">
                  <h2>评论</h2>
                </div>
                <Comment data={comment} />
              </div>
            ) : null}
          </div>
          <div className="fr right">
            <div className="box pb20">
              <div styleName="title">
                <h2>角色声优</h2>
              </div>
              <div>{actor ? actor.map((item, index) => <p key={index}>{item.title}</p>) : <p>暂无</p>}</div>
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
        <Modal visible={visible} showModal={this.showModal} closeModal={this.closeModal}>
          <Sign isSign={isSign} onType={val => this.onType(val)} />
        </Modal>
      </>
    )
  }
}

export default Bangumi
