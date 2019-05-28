import React, { PureComponent } from 'react'
import { withRouter, Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { TopList } from '@/store/actions/page'
import { getTopList } from '@/store/reducers/page'

import BaseLayout from '@/layout/baseLayout'
import Shell from '@/components/Shell'
import Meta from '@/components/Meta'

import './style.scss'

@Shell
@withRouter
@connect(
  (state, props) => ({
    day: getTopList(state, 'hits_day'),
    week: getTopList(state, 'hits_week'),
    month: getTopList(state, 'hits_month'),
    all: getTopList(state, 'hits')
  }),
  dispatch => ({
    TopList: bindActionCreators(TopList, dispatch)
  })
)
class TopPage extends PureComponent {
  static propTypes = {
    day: PropTypes.object,
    week: PropTypes.object,
    month: PropTypes.object,
    all: PropTypes.object,
    TopList: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    const { day, week, month, all, TopList } = this.props
    if (!day.data) {
      TopList({ order: 'hits_day' })
    }
    if (!week.data) {
      TopList({ order: 'hits_week' })
    }
    if (!month.data) {
      TopList({ order: 'hits_month' })
    }
    if (!all.data) {
      TopList({ order: 'hits' })
    }
  }

  render() {
    const { day, week, month, all } = this.props
    const dayData = day.data || []
    const weekData = week.data || []
    const monthData = month.data || []
    const allData = all.data || []
    return (
      <BaseLayout>
        <Meta title="动漫排行榜 动漫热播榜" />
        <div className="wp mt20" styleName="top">
          <div className="box">
            <h2>总</h2>
            <ul styleName="toplist">
              {allData.map((item, index) => (
                <li key={item.id}>
                  <span styleName={`num ${index <= 2 ? 'on' : ''}`}>{index + 1}</span>
                  <Link to={`/subject/${item.id}`}>{item.title}</Link>
                  <span>{item.glod}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="box">
            <h2>月</h2>
            <ul styleName="toplist">
              {monthData.map((item, index) => (
                <li key={item.id}>
                  <span styleName={`num ${index <= 2 ? 'on' : ''}`}>{index + 1}</span>
                  <Link to={`/subject/${item.id}`}>{item.title}</Link>
                  <span>{item.hits}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="box">
            <h2>周</h2>
            <ul styleName="toplist">
              {weekData.map((item, index) => (
                <li key={item.id}>
                  <span styleName={`num ${index <= 2 ? 'on' : ''}`}>{index + 1}</span>
                  <Link to={`/subject/${item.id}`}>{item.title}</Link>
                  <span>{item.hits}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="box">
            <h2>日</h2>
            <ul styleName="toplist">
              {dayData.map((item, index) => (
                <li key={item.id}>
                  <span styleName={`num ${index <= 2 ? 'on' : ''}`}>{index + 1}</span>
                  <Link to={`/subject/${item.id}`}>{item.title}</Link>
                  <span>{item.hits}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </BaseLayout>
    )
  }
}

export default TopPage
