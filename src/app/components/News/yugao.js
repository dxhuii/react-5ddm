import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { newsIndex } from '@/store/actions/newsIndex'
import { getNewsIndex } from '@/store/reducers/newsIndex'

import Loading from '@/components/Ui/Loading'
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
class NewsYG extends Component {
  static propTypes = {
    newsIndex: PropTypes.func,
    newsData: PropTypes.object,
    name: PropTypes.string,
    isType: PropTypes.bool,
    isCate: PropTypes.bool,
    title: PropTypes.string,
    sty: PropTypes.object
  }
  componentDidMount() {
    const { newsIndex, newsData, name } = this.props
    if (!newsData.data) {
      newsIndex({ name })
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
      case 211:
        type = 4
        break
      case 205:
        type = 7
        break
    }
    return type
  }

  showData() {
    const {
      newsData: { data = [] },
      isType
    } = this.props
    return data.map(item => (
      <li key={item.id}>
        {isType ? (
          <Link styleName={`type type-${this.getClass(item.cid)}`} to={`/news/${item.cid}`} title={item.name}>
            {item.name}
          </Link>
        ) : null}
        <Link to={`/article/${item.id}`}>{item.title}</Link>
      </li>
    ))
  }

  render() {
    const {
      newsData: { loading },
      title,
      isCate,
      sty
    } = this.props
    return (
      <div style={sty}>
        <div className="title">
          <h2 styleName="h2">{title || '预告'}</h2>
          {isCate ? (
            <ul styleName="news-tab tab">
              <li>OP</li>
              <li>ED</li>
              <li>CM</li>
              <li>BGM</li>
            </ul>
          ) : null}
        </div>
        <ul styleName="newstxt">
          {loading ? <Loading /> : null}
          {this.showData()}
        </ul>
      </div>
    )
  }
}

export default NewsYG
