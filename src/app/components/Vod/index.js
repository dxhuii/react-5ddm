import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { articleVod } from '@/store/actions/list'
import { getList } from '@/store/reducers/list'

import Detail from '@/components/Detail'

@withRouter
@connect(
  (state, props) => ({
    data: getList(state, `article-${props.ids}`)
  }),
  dispatch => ({
    articleVod: bindActionCreators(articleVod, dispatch)
  })
)
class ArticleVod extends Component {
  static propTypes = {
    articleVod: PropTypes.func,
    data: PropTypes.object,
    ids: PropTypes.any
  }

  componentDidMount() {
    const { ids, articleVod, data } = this.props
    if (!data.data) {
      articleVod({ ids })
    }
  }

  render() {
    const {
      data: { data = [] }
    } = this.props
    return (
      <Fragment>
        {data.map((item, index) => (
          <div className={`box ${index > 0 ? 'mt20' : ''}`} key={item.id}>
            <Detail title={item.title} pic={item.pic} gold={item.glod} vid={item.id} pid={item.pid} status={item.status} year={item.year} mcid={item.mcid} />
          </div>
        ))}
      </Fragment>
    )
  }
}

export default ArticleVod
