import React, { Component } from 'react'

import { withRouter, Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { newsIndex } from '@/store/actions/newsIndex'
import { getNewsIndex } from '@/store/reducers/newsIndex'

import SideBar from '@/components/SideBar'

// 壳组件
import Shell from '@/components/Shell'
import Meta from '@/components/Meta'

import { NAME } from 'Config'

import './style.scss'
@Shell
@withRouter
@connect(
  (state, props) => ({
    newsData: getNewsIndex(state, 'newslist')
  }),
  dispatch => ({
    newsIndex: bindActionCreators(newsIndex, dispatch)
  })
)
class NewsIndex extends Component {
  static propTypes = {
    newsIndex: PropTypes.func,
    newsData: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.load = this.load.bind(this)
  }

  componentDidMount() {
    const { newsData } = this.props
    if (!newsData.data) this.load()
    ArriveFooter.add('newslist', this.load)
  }

  componentWillUnmount() {
    ArriveFooter.remove('newslist')
  }

  async load() {
    const { newsIndex } = this.props
    await newsIndex({ name: 'newslist' })
  }
  render() {
    const {
      newsData: { data = [] }
    } = this.props
    console.log(data, 'newslist')
    return (
      <div className="wp mt20 clearfix">
        <Meta title="新闻首页" />
        <div styleName="news-nav" className="box fl">
          <h2>{NAME}专栏</h2>
        </div>
        <div styleName="news-left" className="box fl">
          {data.length > 0
            ? data.map(item => (
                <div key={item.id} style={{ height: 300 }}>
                  {item.title}
                </div>
              ))
            : null}
        </div>
        <div className="right fr">
          <SideBar />
        </div>
      </div>
    )
  }
}

export default NewsIndex
