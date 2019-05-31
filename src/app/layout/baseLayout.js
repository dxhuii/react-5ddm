import React, { PureComponent, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

// import Head from '@/components/Head'
// import Footer from '@/components/Footer'

@withRouter
class BaseLayout extends PureComponent {
  static propTypes = {
    children: PropTypes.any,
    match: PropTypes.object
  }

  render() {
    return (
      <Fragment>
        {/* <Head match={this.props.match} /> */}
        {this.props.children}
        {/* <Footer /> */}
      </Fragment>
    )
  }
}

export default BaseLayout
