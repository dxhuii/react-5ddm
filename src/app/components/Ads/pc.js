import React from 'react'
import PropTypes from 'prop-types'

// config
import { googleAdSense } from 'Config'

// modules
import AdsByGoogle from './index'

export default function Pc({ width, height }) {
  if (!googleAdSense || !googleAdSense.client || !googleAdSense.slot || !googleAdSense.slot.pc) return null

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

  return (
    <div>
      <div className='card'>
        <div className='card-body' style={{ padding: '19px' }}>
          <AdsByGoogle {...props} />
        </div>
      </div>
    </div>
  )
}

Pc.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number
}
