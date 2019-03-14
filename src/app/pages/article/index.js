import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { article } from '@/store/actions/article'
import { getArticle } from '@/store/reducers/article'
import { hits } from '@/store/actions/hits'
import { getUserInfo } from '@/store/reducers/user'

import Shell from '@/components/Shell'
import Meta from '@/components/Meta'
import SideBar from '@/components/SideBar'
import TagShare from '@/components/TagShare'
import Ads from '@/components/Ads'
import convertHTML from '@/components/HtmlText'

import playing from '@/utils/play'
import { isMobile } from '@/utils'
import { NAME } from 'Config'

import './style.scss'
@Shell
@withRouter
@connect(
  (state, props) => ({
    userinfo: getUserInfo(state),
    articleData: getArticle(state, props.match.params.id)
  }),
  dispatch => ({
    article: bindActionCreators(article, dispatch),
    hits: bindActionCreators(hits, dispatch)
  })
)
class Article extends Component {
  static propTypes = {
    match: PropTypes.object,
    article: PropTypes.func,
    hits: PropTypes.func,
    articleData: PropTypes.object,
    userinfo: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {
      full: false,
      isfull: false
    }
  }

  async componentDidMount() {
    const {
      match: {
        params: { id }
      },
      article,
      articleData,
      hits
    } = this.props
    if (!articleData.data) {
      article({ id })
    }
    hits({ id, sid: 2 })
    document.onkeyup = event => {
      if (event.which == '27') {
        this.isFull()
      }
    }
  }

  isFull = () => {
    this.setState({
      full: !this.state.full
    })
  }

  showFull = () => {
    this.setState({
      isfull: true
    })
  }

  hideFull = () => {
    this.setState({
      isfull: false
    })
  }

  render() {
    const {
      articleData: { data = {} },
      userinfo: { userid },
      match: { url }
    } = this.props
    const {
      title,
      id,
      name,
      cid,
      pic = '',
      remark,
      keywords,
      addtime,
      inputer,
      tag = [],
      prev,
      next,
      vodid,
      // newsid,
      content = '',
      playname = '',
      playurl = ''
    } = data
    const playHtml = playing(playname, playurl, `article_${id}`, userid)
    const { full, isfull } = this.state
    const shareConfig = {
      pic,
      title: `${title} - ${name} - #${NAME.split('_').join('##')}# @99496动漫网`,
      desc: remark,
      url: `/article/${id}`
    }
    return (
      <div className="wp mt20 clearfix">
        <Meta title={title}>
          <meta property="og:locale" content="zh_CN" />
          <meta property="og:type" content="article" />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={remark} />
          <meta property="og:image" content={pic} />
          <meta property="og:url" content={`/article/${id}`} />
          <meta property="og:site_name" content={NAME} />
          <meta name="description" content={remark} />
          <meta name="keywords" content={keywords} />
        </Meta>
        <div className={`fl left ${cid === 205 ? 'manhua' : ''}`}>
          <article styleName="article-body">
            <div styleName="article-head">
              <h1>{title}</h1>
              <div styleName="article-label">
                <span>来源：{inputer ? inputer : '网络'}</span>
                <span>更新时间：{addtime}</span>
              </div>
            </div>
            {playname ? (
              <div styleName={`article-video ${full ? 'play-full' : ''}`} onMouseOver={this.showFull} onMouseLeave={this.hideFull}>
                <div dangerouslySetInnerHTML={{ __html: playHtml }} />
                {isfull ? (
                  <a onMouseOver={this.showFull} onClick={this.isFull}>
                    {full ? '退出全屏' : '网页全屏'}
                  </a>
                ) : null}
              </div>
            ) : null}
            <div styleName="article-content" dangerouslySetInnerHTML={{ __html: convertHTML(content) }} />
            <TagShare tag={tag} config={shareConfig} />
            {isMobile() && (
              <div className="mt20">
                <Ads id={26} url={url} />
              </div>
            )}
            <div styleName="article-context" className="mt20">
              {prev ? (
                <p>
                  上一篇：<Link to={`/article/${prev.id}`}>{prev.title}</Link>
                </p>
              ) : null}
              {next ? (
                <p>
                  下一篇：<Link to={`/article/${next.id}`}>{next.title}</Link>
                </p>
              ) : null}
            </div>
          </article>
        </div>
        {cid === 205 ? null : (
          <div className="fr right">
            <SideBar vodid={vodid} />
          </div>
        )}
      </div>
    )
  }
}

const Articles = props => {
  const {
    match: {
      params: { id }
    }
  } = props
  return <Article {...props} key={id} />
}

Articles.propTypes = {
  match: PropTypes.object
}

export default Articles
