import React, { Component, Fragment } from 'react'

import { withRouter, Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { vodNews } from '@/store/actions/detail'
import { getVodNews } from '@/store/reducers/detail'

import SideBar from '@/components/SideBar'

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

  showData() {
    const {
      newsData: { data = [] }
    } = this.props
    return data.map(item => (
      <li key={item.id}>
        <Link to={`/article/${item.id}`}>
          <img src={item.pic} alt={item.title} />
          {/* <div styleName="mark">
            <p>{item.title}</p>
          </div> */}
        </Link>
      </li>
    ))
  }

  render() {
    const {
      newsData: { data = [] }
    } = this.props
    return (
      <Fragment>
        <div className="wp clearfix">
          <div className="left fl">
            {data.length > 0
              ? data.map(item => (
                  <div key={item.id} style={{ height: 300 }}>
                    {item.id}
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
