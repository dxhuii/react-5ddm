import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

export default function SingleLayout(props) {
  return <Fragment>{props.children}</Fragment>
}

SingleLayout.propTypes = {
  children: PropTypes.array
}
