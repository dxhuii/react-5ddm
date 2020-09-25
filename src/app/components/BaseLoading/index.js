import React from 'react'
import PropTypes from 'prop-types'
import Loading from '@/components/Ui/Loading'

import './style.scss'

const BaseLoading = ({ height = 150 }) => {
  return (
    <div styleName='base-loading' style={{ height }}>
      <Loading />
    </div>
  )
}

BaseLoading.propTypes = {
  height: PropTypes.number
}

export default BaseLoading
