import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { detailActor } from '@/store/actions/list'
import { getList } from '@/store/reducers/list'

import Item from '@/components/Subject/Item'

@connect(
  (state, props) => ({
    info: getList(state, `like-${props.no}`)
  }),
  dispatch => ({
    detailActor: bindActionCreators(detailActor, dispatch)
  })
)
class Like extends Component {
  static propTypes = {
    info: PropTypes.object.isRequired,
    detailActor: PropTypes.func,
    actor: PropTypes.string,
    no: PropTypes.any
  }

  componentDidMount() {
    const { info, actor, detailActor, no } = this.props
    if (!info || !info.data) {
      detailActor({
        actor,
        no
      })
    }
  }

  render() {
    const {
      info: { data = [] }
    } = this.props
    return <Item data={data} />
  }
}

export default Like
