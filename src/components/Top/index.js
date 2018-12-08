import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { topLoad } from '@/store/actions/top'
import { getTopList } from '@/store/reducers/top'
import Loading from '@/components/Ui/Loading'

import './style.scss'

@withRouter
@connect(
  (state, props) => ({
    top: getTopList(state, props.id, props.order, props.area, props.limit)
  }),
  dispatch => ({
    topLoad: bindActionCreators(topLoad, dispatch)
  })
)
class Top extends Component {
  static propTypes = {
    id: PropTypes.number,
    limit: PropTypes.number,
    order: PropTypes.string,
    area: PropTypes.string,
    top: PropTypes.object,
    topLoad: PropTypes.func
  }
  componentDidMount() {
    const { id, order, area, limit, top, topLoad } = this.props
    if (!top || !top.data) {
      topLoad({ id, order, area, limit })
    }
  }

  render() {
    const {
      top: { data = [], loading },
      area
    } = this.props
    return (
      <div styleName="top">
        <h2>
          <i className="iconfont">&#xe613;</i>排行榜
        </h2>
        <ul styleName={area === '大陆' ? 'cn' : ''}>
          {loading ? <Loading /> : null}
          {data.map((item, index) => (
            <li key={item.id}>
              <span styleName={`top-li__num ${index <= 2 ? 'on' : ''}`}>{index + 1}</span>
              <Link to={`/subject/${item.id}`}>{item.title}</Link>
              <span styleName="top-li__score">{item.glod}</span>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default Top
