import React, { Component, Fragment } from 'react'
import { withRouter, Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { episode } from '@/store/actions/episode'
import { detail } from '@/store/actions/detail'
import { getEpisode } from '@/store/reducers/episode'
import { getDetail } from '@/store/reducers/detail'

import MiniDetail from '@/components/Detail/mini'
import Shell from '@/components/Shell'
import Meta from '@/components/Meta'

import './style.scss'

@Shell
@withRouter
@connect(
  (state, props) => ({
    info: getEpisode(state, props.match.params.id, props.match.params.p),
    detailData: getDetail(state, props.match.params.id)
  }),
  dispatch => ({
    episode: bindActionCreators(episode, dispatch),
    detail: bindActionCreators(detail, dispatch)
  })
)
class Episode extends Component {
  static propTypes = {
    match: PropTypes.object,
    episode: PropTypes.func,
    detail: PropTypes.func,
    info: PropTypes.object,
    detailData: PropTypes.object
  }

  componentDidMount() {
    const {
      match: {
        params: { id, p }
      },
      episode,
      info,
      detailData,
      detail
    } = this.props
    if (!info.data) {
      episode({ id, p })
    }
    if (!detailData.data) {
      detail({ id })
    }
  }

  render() {
    const {
      info: { data = {} },
      match: {
        params: { id }
      },
      detailData = {}
    } = this.props
    console.log(data.data || {}, detailData)
    const vod = detailData.data || {}
    const { title, name, content, prev, next } = data.data || {}
    return (
      <div className="wp mt20 clearfix">
        <Meta title={`${vod.title} ${name} ${title}`}>
          <meta name="keywords" content={`${vod.title}剧情,${vod.title}${name}剧情, ${vod.title}${name}${title}剧情`} />
          <meta name="description" content={`${vod.title}${name}${title}剧情介绍：${content}`} />
        </Meta>
        <div styleName="article-left" className="fl">
          <article styleName="article-body">
            <div styleName="article-head">
              <h1>
                {name} {title}
              </h1>
            </div>
            <div styleName="article-content" className="clearfix">
              {content}
            </div>
          </article>
        </div>
        <div styleName="article-right" className="fl">
          <MiniDetail title={vod.title} pic={vod.pic} gold={vod.gold} />
          <Link to={`/subject/${id}`}>去 {vod.title}</Link>
        </div>
      </div>
    )
  }
}

export default Episode
