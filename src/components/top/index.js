import React from 'react'

import { withRouter, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { topLoad } from '../../actions/top'
import { getTopList } from '../../reducers/top'

@withRouter
@connect(
  (state, props) => ({
    top: getTopList(state, props.order || 'addtime', props.area || '')
  }),
  dispatch => ({
    topLoad: bindActionCreators(topLoad, dispatch)
  })
)
export default class Top extends React.Component {

  componentDidMount() {
    const { order = 'addtime', area = '' } = this.props
    const { top, topLoad } = this.props
    if (!top || !top.data) {
      topLoad({ order, area })
    }
  }

  render() {
    const { top: { data = {}, loading }, order = 'addtime', area = '' } = this.props
    console.log(data, order, area)
    return(
      <div className="top">
        { loading ? <div>loading...</div> : null }
      </div>
    )
  }
}
