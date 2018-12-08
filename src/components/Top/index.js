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
    top: getTopList(state, props.order || 'addtime', props.area || '')
  }),
  dispatch => ({
    topLoad: bindActionCreators(topLoad, dispatch)
  })
)
class Top extends Component {
  static propTypes = {
    order: PropTypes.string,
    area: PropTypes.string,
    top: PropTypes.object,
    topLoad: PropTypes.func
  }
  componentDidMount() {
    const { order = 'addtime', area = '' } = this.props
    const { top, topLoad } = this.props
    if (!top || !top.data) {
      topLoad({ order, area })
    }
  }

  render() {
    const {
      top: { data = [], loading },
      area = ''
    } = this.props
    return (
      <div styleName="top">
        <h2>
          <i className="iconfont">&#xe613;</i>排行榜
        </h2>
        <ul>
          {loading ? <Loading /> : null}
          {data.map((item, index) => {
            const elem = (
              <li key={item.id}>
                <span styleName={`top-li__num ${index <= 2 ? 'on' : ''}`}>{index + 1}</span>
                <Link to={`/subject/${item.id}`}>{item.title}</Link>
                <span styleName="top-li__score">{item.glod}</span>
              </li>
            )
            if (area === 'CN') {
              if (index < 7) {
                return elem
              }
            } else {
              return elem
            }
          })}
        </ul>
      </div>
    )
  }
}

export default Top
