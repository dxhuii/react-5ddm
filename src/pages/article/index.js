import React, { Component, Fragment } from 'react'
import { withRouter, Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { article } from '@/store/actions/article'
import { getArticle } from '@/store/reducers/article'

import Shell from '@/components/Shell'
import Meta from '@/components/Meta'

import play from '@/utils/play'

import './style.scss'

const { isJump, is9 } = play
@Shell
@withRouter
@connect(
  (state, props) => ({
    articleData: getArticle(state, props.match.params.id)
  }),
  dispatch => ({
    article: bindActionCreators(article, dispatch)
  })
)
class Article extends Component {
  static propTypes = {
    match: PropTypes.object,
    article: PropTypes.func,
    articleData: PropTypes.object
  }

  componentDidMount() {
    const {
      match: {
        params: { id }
      },
      article,
      articleData
    } = this.props
    if (!articleData.data) {
      article({ id })
    }
  }
  render() {
    const {
      articleData: { data = {} }
    } = this.props
    console.log(data)
    const {
      title,
      id,
      pic,
      remark,
      keywords,
      addtime,
      inputer,
      tag = [],
      prev,
      next,
      vodid,
      newsid,
      content,
      playname = '',
      playurl = ''
    } = data
    const playHtml = isJump(playurl, playname, 1)
    return (
      <div className="warp-bg">
        <Meta title={title}>
          <meta property="og:locale" content="zh_CN" />
          <meta property="og:type" content="article" />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={remark} />
          {pic ? <meta property="og:image" content={pic} /> : null}
          <meta property="og:url" content={`/article/${id}`} />
          <meta property="og:site_name" content="9站" />
          <meta name="description" content={remark} />
          {keywords ? <meta name="keywords" content={keywords} /> : null}
        </Meta>
        <div className="wp clearfix" styleName="article">
          <div styleName="article-left">
            <article styleName="article-body">
              <h1>{title}</h1>
              <div styleName="article-label">
                <span>来源：{inputer ? inputer : '网络'}</span>
                <span>更新时间：{addtime}</span>
              </div>
              {playname ? (
                <div styleName="article-video">{playHtml}</div>
              ) : (
                <div styleName="article-content" dangerouslySetInnerHTML={{ __html: content }} />
              )}

              <div styleName="article-tool" className="mt20">
                {tag.length > 0 ? (
                  <div styleName="article-tool__tag">
                    {tag.map(item => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                ) : null}
                <div styleName="article-tool__share" />
              </div>
              <div styleName="article-context" className="mt20">
                {prev ? (
                  <p>
                    <Link to={`/artilce/${prev.id}`}>{prev.title}</Link>
                  </p>
                ) : null}
                {next ? (
                  <p>
                    <Link to={`/artilce/${next.id}`}>{next.title}</Link>
                  </p>
                ) : null}
              </div>
            </article>
          </div>
          <div styleName="article-right" />
        </div>
      </div>
    )
  }
}

export default Article
