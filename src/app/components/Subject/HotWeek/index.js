import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { hotWeek } from '@/store/actions/list'
import { getList } from '@/store/reducers/list'

import Item from '@/components/Subject/Item'

@connect(
  (state, props) => ({
    info: getList(state, 'hotweek')
  }),
  dispatch => ({
    hotWeek: bindActionCreators(hotWeek, dispatch)
  })
)
class HotWeek extends Component {
  static propTypes = {
    info: PropTypes.object.isRequired,
    hotWeek: PropTypes.func
  }

  componentDidMount() {
    const { info, hotWeek } = this.props
    if (!info || !info.data) {
      hotWeek()
    }
  }

  render() {
    const {
      info: { data = [] }
    } = this.props
    return <Item data={data} />
  }
}

export default HotWeek
