import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { episode } from '@/store/actions/episode'
import { getEpisodeList } from '@/store/reducers/episode'
import { hits } from '@/store/actions/hits'

import Loading from '@/components/Ui/Loading'
import Detail from '@/components/Detail'
import SideBar from '@/components/SideBar'
import TagShare from '@/components/TagShare'
import DetailActor from '@/components/Subject/DetailActor'
import HotWeek from '@/components/Subject/HotWeek'
import Ads from '@/components/Ads'

import Shell from '@/components/Shell'
import Meta from '@/components/Meta'

import { NAME } from 'Config'

import './style.scss'

@Shell
@withRouter
@connect(
  (state, props) => ({
    info: getEpisodeList(state, `${props.match.params.id}${props.match.params.p ? `-${props.match.params.p}` : ''}`)
  }),
  dispatch => ({
    episode: bindActionCreators(episode, dispatch),
    hits: bindActionCreators(hits, dispatch)
  })
)
class Episode extends Component {
  constructor(props) {
    super(props)
    this.state = {
      epMore: false
    }
  }
  static propTypes = {
    match: PropTypes.object,
    episode: PropTypes.func,
    info: PropTypes.object,
    hits: PropTypes.func,
    location: PropTypes.object
  }

  componentDidMount() {
    this.getData()
  }

  componentDidUpdate(prevProps) {
    // 当 url 参数参数发生改变时，重新进行请求
    const oldId = prevProps.match.params
    const newId = this.props.match.params
    if (JSON.stringify(newId) !== JSON.stringify(oldId)) this.getData()
  }

  getData = () => {
    const {
      match: {
        params: { id, p = 0 }
      },
      episode,
      hits,
      info
    } = this.props
    this.setState({
      epMore: false
    })
    if (!info.data) {
      episode({ id, p })
    }
    hits({ id, sid: 4 })
  }

  epMore = () => {
    this.setState({
      epMore: !this.state.epMore
    })
  }

  showList(id, num, p) {
    let list = []
    for (let i = 1; i <= num; i++) {
      const link = <Link to={`/episode/${id}/${i}`}>{`${i}集`}</Link>
      list.push(
        +p === i ? (
          <li key={i} styleName="active">
            {link}
          </li>
        ) : (
          <li key={i}>{link}</li>
        )
      )
    }
    return list.map(item => item)
  }

  render() {
    const {
      info: { data = {}, loading },
      match: {
        params: { p }
      },
      location
    } = this.props
    const { epMore } = this.state
    const { title, name, content, prev, next, vid, id, vTitle, gold, pic, storyNum, vContent, actor, year, status, mcid, pid } = data
    const shareTitle = ` - #${NAME}# @99496动漫网`
    const shareConfig = {
      pic,
      title: !p ? `#${vTitle}#剧情(共${storyNum}集)_${vTitle}全集剧情${shareTitle}` : `#${vTitle}#${name}${title ? ` ${title}` : ''}剧情_${vTitle}分集剧情${shareTitle}`,
      desc: content,
      url: !p ? `/episode/${id}` : `/episode/${id}/${p}`
    }
    const reName = !p ? '' : name
    if (loading || !data.vTitle) return <Loading />
    return (
      <div className="wp mt20 clearfix">
        <Meta title={`${!p ? `${vTitle}剧情(共${storyNum}集)_${vTitle}全集剧情` : `${vTitle}${name}${title ? ` ${title}` : ''}剧情_${vTitle}分集剧情`}`}>
          <meta name="keywords" content={`${vTitle}剧情,${vTitle}${reName}剧情, ${vTitle}${reName}${title}剧情`} />
          <meta name="description" content={`${vTitle}${reName}${title}剧情介绍：${!p ? vContent : content}`} />
        </Meta>
        <div className="fl left">
          <article styleName="article-body">
            <h1>
              <Link to={`/subject/${vid}`}>{vTitle}</Link> {name} {title}
            </h1>
            <div styleName="article-content" className="clearfix">
              {((!p ? vContent : content) || '').replace('&nbsp; ', '').replace('&nbsp; ', '')}
            </div>
            <TagShare tag={[vTitle]} config={shareConfig} location={location} />
            {!p && storyNum <= 1 ? null : (
              <div styleName="article-context" className="mt10">
                {prev && prev > 0 ? <Link to={`/episode/${id}/${prev}`}>上一集</Link> : null}
                {next ? <Link to={`/episode/${id}/${next}`}>下一集</Link> : null}
              </div>
            )}
          </article>
          <div styleName="article-bottom">
            <div className="mt20" styleName="article-ads">
              <Ads id={11} />
            </div>
            <div className="mt10" styleName="ep-like">
              <div styleName="title">
                <h2>相关动漫</h2>
              </div>
              {id ? <DetailActor actor={actor} no={id} /> : null}
            </div>
            <div className="mt10" styleName="ep-like">
              <div styleName="title">
                <h2>小伙伴还在看(=￣ω￣=)（一周热门）</h2>
              </div>
              <HotWeek />
            </div>
          </div>
        </div>
        <div className="fr right">
          <div className="box">
            <Detail title={vTitle} pic={pic} gold={gold} vid={vid} year={year} status={status} mcid={mcid} pid={pid} />
            <ul styleName={`eplist ${epMore ? 'auto' : ''}`}>
              <li styleName={!p ? 'active' : ''}>
                <Link to={`/episode/${id}`}>全部</Link>
              </li>
              {this.showList(id, storyNum, p)}
            </ul>
            <ul styleName="eplist">
              {p > 19 ? (
                <li styleName={!p ? 'active' : ''}>
                  <Link to={`/episode/${id}/${p}`}>{p}集</Link>
                </li>
              ) : null}

              {!epMore && storyNum > 19 ? (
                <li onClick={this.epMore}>
                  <span />
                </li>
              ) : null}
            </ul>
            <Link styleName="go-detail" to={`/subject/${vid}`}>
              去 {vTitle}
            </Link>
          </div>
          <div className="mt20">
            <SideBar />
          </div>
        </div>
      </div>
    )
  }
}

export default Episode
