import React, { Component } from 'react'

import { withRouter, Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { newsIndex } from '@/store/actions/newsIndex'
import { configLoad } from '@/store/actions/config'
import { getConfig } from '@/store/reducers/config'
import { getNewsIndex } from '@/store/reducers/newsIndex'

import SideBar from '@/components/SideBar'
import Swiper from '@/components/Swiper'
import Item from '@/components/News/Item'

// 壳组件
import Shell from '@/components/Shell'
import Meta from '@/components/Meta'

import { NAME } from 'Config'

import './style.scss'

const reNewsCateId = name => {
  let id
  switch (name) {
    case 'zixun':
      id = 211
      break
    case 'donghua':
      id = 206
      break
    case 'manhua':
      id = 205
      break
    case 'cast':
      id = 207
      break
    case 'bagua':
      id = 208
      break
    case 'jianping':
      id = 221
      break
    case 'pic':
      id = 212
      break
    case 'video':
      id = 222
      break
    case 'yugao':
      id = 214
      break
    case 'op':
      id = 215
      break
    case 'bgm':
      id = 216
      break
    case 'ed':
      id = 217
      break
    case 'cm':
      id = 223
      break
    case 'cosplay':
      id = 213
      break
    case 'mad':
      id = 220
      break
    case 'shengrou':
      id = 218
      break
    case 'tedian':
      id = 219
      break
    case 'chanye':
      id = 209
      break
    default:
      id = 44
      break
  }
  return id
}

@Shell
@withRouter
@connect(
  (state, props) => ({
    config: getConfig(state, 'menu'),
    newsData: getNewsIndex(state, 'newslist', reNewsCateId(props.match.params.name))
  }),
  dispatch => ({
    configLoad: bindActionCreators(configLoad, dispatch),
    newsIndex: bindActionCreators(newsIndex, dispatch)
  })
)
class NewsIndex extends Component {
  static propTypes = {
    newsIndex: PropTypes.func,
    configLoad: PropTypes.func,
    config: PropTypes.object,
    newsData: PropTypes.object,
    match: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.load = this.load.bind(this)
  }

  componentDidMount() {
    const { newsData, config, configLoad } = this.props
    if (!config.data) {
      configLoad({ name: 'menu' })
    }
    if (!newsData.data) this.load()
    ArriveFooter.add('newslist', this.load)
  }

  componentWillUnmount() {
    ArriveFooter.remove('newslist')
  }

  async load() {
    const {
      newsIndex,
      match: {
        params: { name }
      }
    } = this.props
    await newsIndex({ name: 'newslist', id: reNewsCateId(name) })
  }

  render() {
    const {
      newsData: { data = [] },
      match: {
        params: { name }
      },
      config
    } = this.props
    const newsMenu = ((config.data || [])[1] || {}).son || []
    return (
      <div className="wp mt20 clearfix">
        <Meta title="动漫新闻_动漫资讯_新番情报_动漫先行图_漫画情报" />
        <div styleName="news-nav" className="box fl">
          <h2>
            <Link to="/news">专栏</Link>
          </h2>
          <ul>
            {newsMenu.map(item => (
              <li key={item.id} styleName={`${name === item.name ? 'active' : ''}`}>
                <Link to={`/news/${item.name}`}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div styleName="news-left" className="box fl">
          <Swiper />
          <Item data={data} />
        </div>
        <div className="right fr">
          <SideBar />
        </div>
      </div>
    )
  }
}

export default NewsIndex
