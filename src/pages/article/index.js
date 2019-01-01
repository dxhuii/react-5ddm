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
      newsid,
      content,
      playname = '',
      playurl = ''
    } = data
    const playHtml = isJump(playurl, playname, 1)
    return (
      <div className="wp mt20 clearfix">
        <Meta title={title}>
          <meta property="og:locale" content="zh_CN" />
          <meta property="og:type" content="article" />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={remark} />
          <meta property="og:image" content={pic} />
          <meta property="og:url" content={`/article/${id}`} />
          <meta property="og:site_name" content="9站" />
          <meta name="description" content={remark} />
          <meta name="keywords" content={keywords} />
        </Meta>
        <div styleName={`article-left ${cid === 205 ? 'manhua' : ''}`} className="fl">
          <article styleName="article-body">
            <div styleName="article-head">
              <h1>{title}</h1>
              <div styleName="article-label">
                <span>来源：{inputer ? inputer : '网络'}</span>
                <span>更新时间：{addtime}</span>
              </div>
            </div>

            {/* {remark ? <div styleName="acticle-remark">{remark}</div> : null} */}
            {playname ? (
              <div styleName="article-video" dangerouslySetInnerHTML={{ __html: playHtml }} />
            ) : (
              <div styleName="article-content" dangerouslySetInnerHTML={{ __html: content }} />
            )}

            <div styleName="article-tool" className="mt20">
              {tag.length > 0 ? (
                <div styleName="article-tool__tag">
                  {tag.map(item => (
                    <span key={item}>#{item}</span>
                  ))}
                </div>
              ) : null}
              <div styleName="article-tool__share" />
            </div>
            <div styleName="article-context" className="mt20">
              {prev ? (
                <p>
                  <Link to={`/article/${prev.id}`}>{prev.title}</Link>
                </p>
              ) : null}
              {next ? (
                <p>
                  <Link to={`/article/${next.id}`}>{next.title}</Link>
                </p>
              ) : null}
            </div>
          </article>
        </div>
        <div styleName="article-right" className="fr" style={cid === 205 ? { display: 'none' } : {}}>
          right
        </div>
      </div>
    )
  }
}

export default Article
