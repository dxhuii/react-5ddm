import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { recommend } from '@/store/actions/list'
import { getList } from '@/store/reducers/list'

import { formatPic } from '@/utils'

import './style.scss'

@withRouter
@connect(
  (state, props) => ({
    animeData: getList(state, 'anime'),
    newsData: getList(state, 'news')
  }),
  dispatch => ({
    recommendAnime: bindActionCreators(recommend, dispatch),
    recommendNews: bindActionCreators(recommend, dispatch)
  })
)
class Recommend extends Component {
  static propTypes = {
    recommendAnime: PropTypes.func,
    recommendNews: PropTypes.func,
    animeData: PropTypes.object,
    newsData: PropTypes.object
  }
  componentDidMount() {
    const { recommendAnime, animeData, recommendNews, newsData } = this.props
    if (!animeData.data) {
      recommendAnime({ name: 'anime' })
    }
    if (!newsData.data) {
      recommendNews({ name: 'news' })
    }
  }

  showData(data = [], type) {
    const link = id => (type ? `/subject/${id}` : `/article/${id}`)
    return data.map(item => (
      <li key={item.id}>
        <Link to={link(item.id)}>
          <img src={formatPic(item.pic, 'orj360')} alt={item.title} />
          <div styleName="mark">
            <p>{item.title}</p>
          </div>
        </Link>
      </li>
    ))
  }

  render() {
    const { newsData, animeData } = this.props
    const news = newsData.data
    const anime = animeData.data
    return (
      <ul styleName="recommend">
        {this.showData(anime, 1)}
        {this.showData(news)}
      </ul>
    )
  }
}

export default Recommend
