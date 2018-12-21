import React, { Component, Fragment } from 'react'
import { withRouter, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { newsList } from '@/store/actions/news'
import { getNews } from '@/store/reducers/news'

import './style.scss'

@withRouter
@connect(
  (state, props) => ({
    newsData: getNews(
      state,
      props.id,
      props.news || '',
      props.did || '',
      props.name || '',
      props.wd || '',
      props.letter || '',
      props.day || '',
      props.order || '',
      props.limit || 12
    )
  }),
  dispatch => ({
    newsList: bindActionCreators(newsList, dispatch)
  })
)
class News extends Component {
  static propTypes = {
    id: PropTypes.any,
    news: PropTypes.any,
    did: PropTypes.any,
    wd: PropTypes.string,
    letter: PropTypes.string,
    name: PropTypes.any,
    day: PropTypes.any,
    order: PropTypes.string,
    limit: PropTypes.any,
    newsList: PropTypes.func,
    newsData: PropTypes.object
  }

  componentDidMount() {
    const { id, news, did, name, wd, letter, day, order, limit, newsList, newsData } = this.props
    console.log(newsData)
    if (!newsData.data) {
      newsList({ id, news, did, name, wd, letter, day, order, limit })
    }
  }

  showData() {
    const {
      newsData: { data = [] }
    } = this.props
    return data.map(item => (
      <li key={item.id}>
        <div styleName="picbox">
          <Link styleName="pic" to={`/article/${item.id}`}>
            <img src={item.pic} />
          </Link>
          <Link styleName="type" to={`/news/${item.cid}`} title={item.name}>
            {item.name}
          </Link>
        </div>
        <h2>
          <Link to={`/article/${item.id}`}>{item.title}</Link>
        </h2>
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
          <Link to="/">
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
