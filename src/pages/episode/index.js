import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { episode } from '@/store/actions/episode'
import { getEpisode } from '@/store/reducers/episode'

import Detail from '@/components/Detail'
import Shell from '@/components/Shell'
import Meta from '@/components/Meta'

import './style.scss'

@Shell
@withRouter
@connect(
  (state, props) => ({
    info: getEpisode(state, props.match.params.id, props.match.params.p)
  }),
  dispatch => ({
    episode: bindActionCreators(episode, dispatch)
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
    info: PropTypes.object
  }

  componentDidMount() {
    const {
      match: {
        params: { id, p }
      },
      episode,
      info
    } = this.props
    if (!info.data) {
      episode({ id, p })
    }
  }

  epMore = () => {
    this.setState({
      epMore: !this.state.epMore
    })
  }

  render() {
    const {
      info: { data = {} },
      match: {
        params: { id, p }
      }
    } = this.props
    const { epMore } = this.state
    const { title, name, content, prev, next, storylist = [], vid, vTitle, gold, pic } = data
    return (
      <div className="wp mt20 clearfix">
        <Meta title={`${vTitle} ${name} ${title}`}>
          <meta name="keywords" content={`${vTitle}剧情,${vTitle}${name}剧情, ${vTitle}${name}${title}剧情`} />
          <meta name="description" content={`${vTitle}${name}${title}剧情介绍：${content}`} />
        </Meta>
        <div styleName="article-left" className="fl">
          <article styleName="article-body">
            <div styleName="article-head">
              <h1>
                {vTitle} {name} {title}
              </h1>
            </div>
            <div styleName="article-content" className="clearfix">
              {(content || '').replace('&nbsp; ', '').replace('&nbsp; ', '')}
            </div>
            <div styleName="article-context">
              {prev ? <Link to={`/episode/${vid}/${prev}`}>上一集</Link> : null}
              {next ? <Link to={`/episode/${vid}/${next}`}>下一集</Link> : null}
            </div>
          </article>
        </div>
        <div styleName="article-right" className="fl">
          <Detail title={vTitle} pic={pic} gold={gold} vid={vid} />
          <ul styleName={`eplist ${epMore ? 'auto' : ''}`}>
            {storylist.map(item => {
              const link = <Link to={`/episode/${vid}/${item.pid}`}>{item.name.replace('第', '')}</Link>
              return +p === item.pid ? (
                <li key={item.pid} styleName="active">
                  {link}
                </li>
              ) : (
                <li key={item.pid}>{link}</li>
              )
            })}
          </ul>
          <div onClick={this.epMore} styleName="eplist-more">
            {epMore ? '收起' : '更多'}
          </div>
          <Link styleName="go-detail" to={`/subject/${id}`}>
            去 {vTitle}
          </Link>
        </div>
      </div>
    )
  }
}

export default Episode
