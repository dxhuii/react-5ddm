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
    newsData: getNewsIndex(state, 'newsTextList')
  }),
  dispatch => ({
    newsIndex: bindActionCreators(newsIndex, dispatch)
  })
)
class NewsYG extends Component {
  static propTypes = {
    newsIndex: PropTypes.func,
    newsData: PropTypes.object
  }
  componentDidMount() {
    const { newsIndex, newsData } = this.props
    if (!newsData.data) {
      newsIndex({ name: 'newsTextList' })
    }
  }

  getClass(cid) {
    let type = 6
    switch (cid) {
      case 214:
        type = 1
        break
      case 223:
        type = 2
        break
      case 217:
        type = 3
        break
    }
    return type
  }

  showData() {
    const {
      newsData: { data = [] }
    } = this.props
    return data.map(item => (
      <li key={item.id}>
        {/* <Link styleName={`type type-${this.getClass(item.cid)}`} to={`/news/${item.cid}`} title={item.name}>
          {item.name}
        </Link> */}
        <Link to={`/article/${item.id}`}>{item.title}</Link>
      </li>
    ))
  }

  render() {
    return (
      <Fragment>
        <div className="title">
          <h2 styleName="h2">预告</h2>
          <ul styleName="news-tab tab">
            <li>OP</li>
            <li>ED</li>
            <li>CM</li>
            <li>BGM</li>
          </ul>
        </div>
        <ul styleName="newstxt">{this.showData()}</ul>
      </Fragment>
    )
  }
}

export default NewsYG
