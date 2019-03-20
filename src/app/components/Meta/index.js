import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import MetaTags, { ReactTitle } from 'react-meta-tags'

import { NAME } from 'Config'

export default class Meta extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    title: PropTypes.string,
    children: PropTypes.any,
    url: PropTypes.string
  }

  render() {
    const { title, url } = this.props

    let _title = ''
    _title += title || NAME
    if (title) url ? title : (_title += ` - ${NAME}`)

    return (
      <Fragment>
        <ReactTitle title={_title} />
        {this.props.children ? <MetaTags>{this.props.children}</MetaTags> : null}
      </Fragment>
    )
  }
}
