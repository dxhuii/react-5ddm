import React, { Component, Fragment } from 'react'
import { withRouter, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { newsIndex } from '@/store/actions/newsIndex'
import { getNewsIndex } from '@/store/reducers/newsIndex'

import './style.scss'

@withRouter
@connect(
  (state, props) => ({
    newsData: getNewsIndex(state, 'newsPicList')
  }),
  dispatch => ({
    newsIndex: bindActionCreators(newsIndex, dispatch)
  })
)
class News extends Component {
  static propTypes = {
    newsIndex: PropTypes.func,
    newsData: PropTypes.object
  }

  componentDidMount() {
    const { newsIndex, newsData } = this.props
    if (!newsData.data) {
      newsIndex({ name: 'newsPicList' })
    }
  }

  showData() {
    const {
      newsData: { data = [] }
    } = this.props
    return data.map(item => (
      <li key={item.id}>
        <Link to={`/article/${item.id}`}>
          <img src={item.pic} alt={item.title} />
          <div styleName="mark">
            <p>{item.title}</p>
          </div>
        </Link>
      </li>
    ))
  }

  render() {
    return (
      <Fragment>
        <div className="title">
          <h2>
            <i className="title-icon news" /> 新闻
          </h2>
          <ul styleName="news-tab">
            <li>动画</li>
            <li>漫画</li>
            <li>八卦</li>
            <li>简评</li>
            <li>COS</li>
            <li>产业</li>
            <li>声优</li>
            <li>美图</li>
            <li>短视频</li>
          </ul>
          <Link to="/news">
            更多
            <i className="iconfont">&#xe65e;</i>
          </Link>
        </div>
        <ul styleName="newslist">{this.showData()}</ul>
      </Fragment>
    )
  }
}

export default News
