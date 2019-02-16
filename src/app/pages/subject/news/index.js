import React, { Component, Fragment } from 'react'

import { withRouter, Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { vodNews } from '@/store/actions/detail'
import { getVodNews } from '@/store/reducers/detail'

import SideBar from '@/components/SideBar'
import Item from '@/components/News/Item'

@withRouter
@connect(
  (state, props) => ({
    newsData: getVodNews(state, props.match.params.id)
  }),
  dispatch => ({
    vodNews: bindActionCreators(vodNews, dispatch)
  })
)
class VodNews extends Component {
  static propTypes = {
    vodNews: PropTypes.func,
    newsData: PropTypes.object,
    id: PropTypes.any,
    match: PropTypes.object,
    scrollLoad: PropTypes.bool
  }

  constructor(props) {
    super(props)
    this.load = this.load.bind(this)
  }

  componentDidMount() {
    const {
      newsData,
      match: {
        params: { id }
      }
    } = this.props
    if (!newsData.data) this.load()
    ArriveFooter.add(id, this.load)
  }

  componentWillUnmount() {
    const {
      match: {
        params: { id }
      }
    } = this.props
    ArriveFooter.remove(id)
  }

  async load() {
    const {
      vodNews,
      match: {
        params: { id }
      }
    } = this.props
    await vodNews({ id })
  }

  render() {
    const {
      newsData: { data = [] },
      match: {
        params: { id }
      }
    } = this.props
    return (
      <Fragment>
        <div className="wp clearfix mt20">
          <div className="left box fl">
            <Item data={data} />
          </div>
          <div className="right fr">
            <SideBar vodid={+id} />
          </div>
        </div>
      </Fragment>
    )
  }
}

export default VodNews
