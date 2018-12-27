import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { detailEp } from '@/store/actions/detailEp'
import { getDetailEp } from '@/store/reducers/detailEp'

@withRouter
@connect(
  (state, props) => ({
    info: getDetailEp(state, props.match.params.id)
  }),
  dispatch => ({
    detailEp: bindActionCreators(detailEp, dispatch)
  })
)
class DetailEp extends Component {
  static propTypes = {
    match: PropTypes.object,
    detailEp: PropTypes.func,
    info: PropTypes.object
  }

  componentDidMount() {
    const {
      match: {
        params: { id }
      },
      info,
      detailEp
    } = this.props
    if (!info.data) {
      detailEp({ id })
    }
  }

  render() {
    const {
      info: { data = [] }
    } = this.props
    console.log(data)
    return <div>111</div>
  }
}

export default DetailEp
