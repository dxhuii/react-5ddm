import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import Head from '@/components/Head'
import Footer from '@/components/Footer'

export default function BaseLayout(props) {
  return (
    <Fragment>
      <Head />
      {props.children}
      <Footer />
    </Fragment>
  )
}

BaseLayout.propTypes = {
  children: PropTypes.array
}
