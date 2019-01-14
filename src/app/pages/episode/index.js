import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { episode } from '@/store/actions/episode'
import { getEpisode } from '@/store/reducers/episode'
import { hits } from '@/store/actions/hits'

import Detail from '@/components/Detail'
import Shell from '@/components/Shell'
import Meta from '@/components/Meta'
import Share from '@/components/Share'

import './style.scss'

@Shell
@withRouter
@connect(
  (state, props) => ({
    info: getEpisode(state, props.match.params.id, props.match.params.p || 0)
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
      epMore: props.match.params.p > 20 ? true : false
    }
  }
  static propTypes = {
    match: PropTypes.object,
    episode: PropTypes.func,
    info: PropTypes.object,
    hits: PropTypes.func
  }

  componentDidMount() {
    const {
      match: {
        params: { id, p = 0 }
      },
      episode,
      hits,
      info
    } = this.props
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
      info: { data = {} },
      match: {
        params: { p }
      }
    } = this.props
    const { epMore } = this.state
    const { title, name, content, prev, next, vid, id, vTitle, gold, pic, storyNum, vContent, actor } = data
    const shareConfig = {
      pic,
      title: !p ? `${vTitle}剧情(共${storyNum}集)_${vTitle}全集剧情` : `${vTitle}${name}${title ? ` ${title}` : ''}剧情_${vTitle}分集剧情`,
      desc: content,
      url: !p ? `/episode/${id}` : `/episode/${id}/${p}`
    }
    return (
      <div className="wp mt20 clearfix">
        <Meta
          title={`${
            !p ? `${vTitle}剧情(共${storyNum}集)_${vTitle}全集剧情` : `${vTitle}${name}${title ? ` ${title}` : ''}剧情_${vTitle}分集剧情`
          }`}
        >
          <meta name="keywords" content={`${vTitle}剧情,${vTitle}${name}剧情, ${vTitle}${name}${title}剧情`} />
          <meta name="description" content={`${vTitle}${name}${title}剧情介绍：${content}`} />
        </Meta>
        <div styleName="article-left" className="fl">
          <article styleName="article-body">
            <div styleName="article-head">
              <h1>
                <Link to={`/subject/${vid}`}>{vTitle}</Link> {name} {title}
              </h1>
            </div>
            <div styleName="article-content" className="clearfix">
              {((!p ? vContent : content) || '').replace('&nbsp; ', '').replace('&nbsp; ', '')}
            </div>
            <div styleName="article-tool" className="mt20">
              <div styleName="article-tool__tag">
                <Link to={`/subject/${vid}`}>#{vTitle}</Link>
              </div>
              <div styleName="article-tool__share">
                <Share data={shareConfig} />
              </div>
            </div>
            {!p && storyNum <= 1 ? null : (
              <div styleName="article-context" className="mt10">
                {prev ? <Link to={`/episode/${id}/${prev}`}>上一集</Link> : null}
                {next ? <Link to={`/episode/${id}/${next}`}>下一集</Link> : null}
              </div>
            )}
          </article>
        </div>
        <div styleName="article-right" className="fl">
          <Detail title={vTitle} pic={pic} gold={gold} vid={vid} />
          <ul styleName={`eplist ${epMore ? 'auto' : ''}`}>
            <li styleName={!p ? 'active' : ''}>
              <Link to={`/episode/${id}`}>全部</Link>
            </li>
            {this.showList(id, storyNum, p)}
          </ul>
          {p > 19 ? (
            <div onClick={this.epMore} styleName="eplist-more">
              {epMore ? '收起' : '更多'}
            </div>
          ) : null}
          <Link styleName="go-detail" to={`/subject/${vid}`}>
            去 {vTitle}
          </Link>
        </div>
      </div>
    )
  }
}

export default Episode
