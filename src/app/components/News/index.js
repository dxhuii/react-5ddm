import React, { Component, Fragment } from 'react'
import { withRouter, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { newsIndex } from '@/store/actions/newsIndex'
import { getNewsIndex } from '@/store/reducers/newsIndex'

import Loading from '@/components/Ui/Loading'

import { formatPic } from '@/utils'

import './style.scss'

@withRouter
@connect(
  (state, props) => ({
    newsData: getNewsIndex(state, props.name)
  }),
  dispatch => ({
    newsIndex: bindActionCreators(newsIndex, dispatch)
  })
)
class News extends Component {
  static propTypes = {
    newsIndex: PropTypes.func,
    newsData: PropTypes.object,
    name: PropTypes.string
  }

  componentDidMount() {
    const { newsIndex, newsData, name } = this.props
    if (!newsData.data) {
      newsIndex({ name })
    }
  }

  showData() {
    const {
      newsData: { data = [] }
    } = this.props
    return data.map(item => (
      <li key={item.id}>
        <Link to={`/article/${item.id}`}>
          <div className="load-demand" data-load-demand={`<img src="${formatPic(item.pic, 'orj360')}" alt="${item.title}" />`} />
          <div styleName="mark">
            <p>{item.title}</p>
          </div>
        </Link>
      </li>
    ))
  }

  render() {
    const {
      newsData: { loading }
    } = this.props
    return (
      <Fragment>
        <div className="title">
          <h2>
            <i className="title-icon news" /> 新闻
          </h2>
          <div styleName="tab">
            <span>分类</span>
            <ul styleName="news-tab">
              <li>
                <Link to="/news/donghua">动画</Link>
              </li>
              <li>
                <Link to="/news/manhua">漫画</Link>
              </li>
              <li>
                <Link to="/news/bagua">八卦</Link>
              </li>
              <li>
                <Link to="/news/jianping">简评</Link>
              </li>
              <li>
                <Link to="/news/cosplay">COS</Link>
              </li>
              <li>
                <Link to="/news/chanye">产业</Link>
              </li>
              <li>
                <Link to="/news/cast">声优</Link>
              </li>
              <li>
                <Link to="/news/pic">美图</Link>
              </li>
              <li>
                <Link to="/news/video">短视频</Link>
              </li>
            </ul>
          </div>
          <Link to="/news">
            更多
            <i className="iconfont">&#xe65e;</i>
          </Link>
        </div>
        <ul styleName="newslist">
          {loading ? <Loading /> : null}
          {this.showData()}
        </ul>
      </Fragment>
    )
  }
}

export default News
