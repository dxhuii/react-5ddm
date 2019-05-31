import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { detailActor } from '@/store/actions/actor'
import { getDetailActor } from '@/store/reducers/actor'

import { isNumber, formatPic } from '@/utils'

import './style.scss'

@withRouter
@connect(
  (state, props) => ({
    info: getDetailActor(state, props.no, props.actor)
  }),
  dispatch => ({
    detailActor: bindActionCreators(detailActor, dispatch)
  })
)
class Bangumi extends Component {
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
    return (
      <Fragment>
        <div styleName="d-item">
          {data.map(item => (
            <li key={item.id}>
              <Link to={`/subject/${item.id}`}>
                <div className="load-demand" data-load-demand={`<img src="${formatPic(item.pic, 'orj360')}" alt="${item.title}" />`} />
                <h3>{item.title}</h3>
              </Link>
              <Link to={`/play/${item.id}/${item.pid}`}>
                {isNumber(item.status) ? (
                  item.isDate ? (
                    <p styleName="today">更新至{item.status}话</p>
                  ) : (
                    <p>更新至{item.status}话</p>
                  )
                ) : item.isDate ? (
                  <p styleName="today">{item.status}</p>
                ) : (
                  <p>{item.status}</p>
                )}
              </Link>
            </li>
          ))}
        </div>
      </Fragment>
    )
  }
}

export default Bangumi
