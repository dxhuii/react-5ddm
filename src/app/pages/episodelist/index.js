import React, { Component, Fragment } from 'react'

import { withRouter, Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { episodeList } from '@/store/actions/episode'
import { getEpisodeList } from '@/store/reducers/episode'

import SideBar from '@/components/SideBar'

@withRouter
@connect(
  (state, props) => ({
    list: getEpisodeList(state, 'episodelist')
  }),
  dispatch => ({
    episodeList: bindActionCreators(episodeList, dispatch)
  })
)
class VodNews extends Component {
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
        <div className="wp mt20 clearfix">
          <div className="left fl">
            {data.length > 0
              ? data.map(item => (
                  <div key={item.id} style={{ height: 300 }}>
                    {item.storyId}
                  </div>
                ))
              : null}
          </div>
          <div className="right fr">
            <SideBar />
          </div>
        </div>
      </Fragment>
    )
  }
}

export default VodNews
