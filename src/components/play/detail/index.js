import React from 'react'

import { withRouter, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { detail } from '../../../actions/detail'
import { getDetail } from '../../../reducers/detail'

import Meta from '../../../components/meta'

@withRouter
@connect(
  (state, props) => ({
    info: getDetail(state, props.match.params.id)
  }),
  dispatch => ({
    detail: bindActionCreators(detail, dispatch)
  })
)
export class Detail extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {

    const { id } = this.props.match.params;
    const { info, detail } = this.props

    if (!info || !info.data) {
      detail({ id })
    }
  }

  render() {
    const { info: { data = {}, loading }, isMeta, subTitle } = this.props
    return(
      <div className="detail">
        { loading ? <div>loading...</div> : null }
        { isMeta ? <Meta title={data.name} keywords={data.name} description={data.name} /> : null }
        <Link to={`/bangumi/${data.id}`}>{ data.name }</Link>{ subTitle ? ` ${subTitle}` : null }
      </div>
    )
  }
}

export default Detail;
