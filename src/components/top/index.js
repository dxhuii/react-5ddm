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
        <ListGroup>
          {data.map((item, index) => {
            const elem = <Item key={item.id}><Badge className='float-right' variant='warning'>{item.glod}</Badge><Badge className='float-left' pill variant={index > 2 ? 'secondary' : 'success'}>{index + 1}</Badge><Link className='float-left' to={`/bangumi/${item.id}`}>{item.title}</Link></Item>
            if(area === 'CN'){
              if(index < 7){
                return elem
              }
            } else {
              return elem
            }
          })}
        </ListGroup>
      </div>
    )
  }
}
