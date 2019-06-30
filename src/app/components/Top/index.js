import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { top } from '@/store/actions/list'
import { getList } from '@/store/reducers/list'
import Loading from '@/components/Ui/Loading'

import './style.scss'

@withRouter
@connect(
  (state, props) => ({
    topData: getList(state, props.name)
  }),
  dispatch => ({
    top: bindActionCreators(top, dispatch)
  })
)
class Top extends Component {
  static propTypes = {
    name: PropTypes.string,
    topData: PropTypes.object,
    top: PropTypes.func,
    title: PropTypes.string,
    sty: PropTypes.object
  }
  componentDidMount() {
    const { name, top, topData } = this.props
    if (!topData || !topData.data) {
      top({ name })
    }
  }

  render() {
    const {
      topData: { data = [], loading },
      name,
      title,
      sty
    } = this.props
    return (
      <div styleName="top" style={sty}>
        <h2>{title || '排行榜'}</h2>
        <ul styleName={name === 'topListIndexCN' ? 'cn' : ''}>
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
