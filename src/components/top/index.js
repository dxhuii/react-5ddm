import React, { Component } from 'react'

import { withRouter, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { topLoad } from '../../actions/top'
import { getTopList } from '../../reducers/top'

import CSSModules from 'react-css-modules'
import styles from './index.scss'

import ListGroup from 'react-bootstrap/lib/ListGroup'
import Badge from 'react-bootstrap/lib/Badge'
const { Item } = ListGroup

@withRouter
@connect(
  (state, props) => ({
    top: getTopList(state, props.order || 'addtime', props.area || '')
  }),
  dispatch => ({
    topLoad: bindActionCreators(topLoad, dispatch)
  })
)
@CSSModules(styles)
export default class Top extends Component {

  componentDidMount() {
    const { order = 'addtime', area = '' } = this.props
    const { top, topLoad } = this.props
    if (!top || !top.data) {
      topLoad({ order, area })
    }
  }

  render() {
    const { top: { data = [], loading }, area = '' } = this.props
    return(
      <div styleName="top">
        { loading ? <div>loading...</div> : null }
        <h2>排行榜</h2>
        <ul class="list-group">
          {data.map((item, index) => {
            const elem = <li class="list-group-item" key={item.id}><span className="badge badge-warning float-right">{item.glod}</span><span className={`badge badge-pill badge-${index > 2 ? 'secondary' : 'success'} float-left`}>{index + 1}</span><Link className='float-left' to={`/bangumi/${item.id}`}>{item.title}</Link></li>
            if(area === 'CN'){
              if(index < 7){
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
