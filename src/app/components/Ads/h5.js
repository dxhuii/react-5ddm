import React from 'react'
import PropTypes from 'prop-types'

// config
import { googleAdSense } from 'Config'

// modules
import AdsByGoogle from './index'

export default function H5({ width, height }) {
  if (!googleAdSense || !googleAdSense.client || !googleAdSense.slot || !googleAdSense.slot.h5) return null

  const style = {
    display: 'inline-block',
    width,
    height
  }

  const props = {
    style,
    'data-ad-client': googleAdSense.client,
    'data-ad-slot': googleAdSense.slot.pc
  }

  return <AdsByGoogle {...props} />
}

H5.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number
}
