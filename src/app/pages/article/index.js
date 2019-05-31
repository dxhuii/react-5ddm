import React, { PureComponent } from 'react'
import { withRouter, Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { article } from '@/store/actions/article'
import { getArticle } from '@/store/reducers/article'
import { hits } from '@/store/actions/hits'
import { getUserInfo } from '@/store/reducers/user'

import BaseLayout from '@/layout/baseLayout'
import Loading from '@/components/Ui/Loading'
import SideBar from '@/components/SideBar'
import TagShare from '@/components/TagShare'
import Ads from '@/components/Ads'
import convertHTML from '@/components/HtmlText'
import Swiper from '@/components/Swiper'
import Shell from '@/components/Shell'
import Meta from '@/components/Meta'

import playing from '@/utils/play'
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
class Article extends PureComponent {
  static propTypes = {
    match: PropTypes.object,
    article: PropTypes.func,
    hits: PropTypes.func,
    articleData: PropTypes.object,
    userinfo: PropTypes.object,
    location: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {
      full: false,
      isfull: false,
      showPic: false,
      imgObj: {}
    }
  }

  async componentDidMount() {
    const that = this
    document.onkeyup = event => {
      if (event.which == '27') {
        this.isFull()
      }
    }
    this.getData()
    document.body.addEventListener('click', function(e) {
      // 判断是否点击的图片
      if (e.path[0].nodeName === 'IMG' && that.content) {
        let params = {}
        params.param = {}
        // 获取imglist
        const oPics = that.content.getElementsByTagName('img')
        params.param.imageArray = []
        for (let i = 0; i < oPics.length; i++) {
          params.param.imageArray.push({ url: oPics[i].src })
        }
        for (let i = 0; i < oPics.length; i++) {
          // 判断点击图片的index
          if (e.path[0].src === params.param.imageArray[i].url) {
            params.param.index = i
          }
        }

        that.setState({
          imgObj: params.param,
          showPic: true
        })
      }
    })
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
      article,
      articleData,
      hits
    } = this.props
    if (!articleData.data) {
      article({ id })
    }
    hits({ id, sid: 2 })
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

  closePic = () => {
    this.setState({
      showPic: false
    })
  }

  render() {
    const {
      articleData: { data = {}, loading },
      match: { url },
      userinfo: { userid },
      location
    } = this.props
    const { title, id, name, cid, pic = '', remark, keywords, addtime, inputer, tag = [], prev, next, vodid, jump, content = '', playname = '', playurl = '' } = data
    const playHtml = playing({ name: playname, vid: playurl, danmu: `article_${id}`, uid: userid, url })
    const { full, isfull, showPic, imgObj } = this.state
    const shareConfig = {
      pic,
      title: `${title} - ${name} - #${NAME}# @99496动漫网`,
      desc: remark,
      url: `/article/${id}`
    }
    if (jump && !(typeof window === 'undefined')) {
      window.location.href = jump
    }
    const { imageArray = [], index } = imgObj
    if (loading || !data.title) return <Loading />
    return (
      <BaseLayout>
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
              <div ref={e => (this.content = e)} styleName="article-content" dangerouslySetInnerHTML={{ __html: convertHTML(content) }} />
              {showPic ? (
                <div styleName="article-slide" onClick={this.closePic}>
                  <span />
                  <Swiper Pagination={true} Controller={true} Start={index}>
                    {imageArray.map((item, index) => (
                      <div className="swipe-item" key={item.url + index}>
                        <img src={item.url} />
                      </div>
                    ))}
                  </Swiper>
                </div>
              ) : null}
              <TagShare tag={tag} config={shareConfig} location={location} />
              <div className="mt20">
                <Ads id={11} />
              </div>
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
      </BaseLayout>
    )
  }
}

// const Articles = props => {
//   const {
//     match: {
//       params: { id }
//     }
//   } = props
//   return <Article {...props} key={id} />
// }

// Articles.propTypes = {
//   match: PropTypes.object
// }

export default Article
