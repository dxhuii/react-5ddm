import React, { Component, Fragment } from 'react'
import { withRouter, Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { articleVod } from '@/store/actions/articleVod'
import { getArticleVod } from '@/store/reducers/articleVod'

@withRouter
@connect(
  (state, props) => ({
    data: getArticleVod(state, props.ids)
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
    // const { ids, data } = this.props
    // console.log(ids, data)
    return <div className="wp mt20 clearfix">111</div>
  }
}

export default ArticleVod
