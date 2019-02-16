import React, { Component, Fragment } from 'react'

import { withRouter, Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { episodeList } from '@/store/actions/episode'
import { getEpisodeList } from '@/store/reducers/episode'

import SideBar from '@/components/SideBar'
import { formatPic, isNumber } from '@/utils'

import Shell from '@/components/Shell'
import Meta from '@/components/Meta'

import './style.scss'

@Shell
@withRouter
@connect(
  (state, props) => ({
    list: getEpisodeList(state, 'episodelist')
  }),
  dispatch => ({
    episodeList: bindActionCreators(episodeList, dispatch)
  })
)
class EpisodeList extends Component {
  static propTypes = {
    episodeList: PropTypes.func,
    list: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.load = this.load.bind(this)
  }

  componentDidMount() {
    const { list } = this.props
    if (!list.data) this.load()
    ArriveFooter.add('episodelist', this.load)
  }

  componentWillUnmount() {
    ArriveFooter.remove('episodelist')
  }

  async load() {
    const { episodeList } = this.props
    await episodeList()
  }

  render() {
    const {
      list: { data = [] }
    } = this.props
    return (
      <Fragment>
        <Meta title="剧情首页" />
        <div className="wp mt20 clearfix">
          <div className="left fl">
            <ul styleName="list">
              {data.map(item => (
                <li key={item.storyId}>
                  <Link to={`/episode/${item.storyId}`}>
                    <div
                      className="load-demand"
                      data-load-demand={`<img src="${formatPic(item.pic, 'thumb150')}" alt="${item.title}" />`}
                    />
                    <h4>{item.title}</h4>
                    <p>{isNumber(item.continu) ? `更新至${item.continu}话` : item.continu}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="right fr">
            <SideBar />
          </div>
        </div>
      </Fragment>
    )
  }
}

export default EpisodeList
