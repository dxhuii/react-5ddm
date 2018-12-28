import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { detailEp } from '@/store/actions/detailEp'
import { getDetailEp } from '@/store/reducers/detailEp'

import './style.scss'

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
    info: PropTypes.object,
    detail: PropTypes.object
  }

  static defaultProps = {
    detail: {}
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
      info: { data = [] },
      detail
    } = this.props
    console.log(data)
    return (
      <div styleName="ep" className="mt20">
        <h2>{detail.title}的剧情</h2>
        <ul styleName="eplist" className="mt20">
          {data.map(item => (
            <li key={item.pid}>
              <h4>
                <Link to={`/episode/${item.vodid}/${item.pid}`}>
                  {item.name} {item.title}
                </Link>
              </h4>
              <p>{item.content}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default DetailEp
