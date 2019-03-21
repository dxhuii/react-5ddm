import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import './style.scss'

export default function Tooltip({ children, text, ...rest }) {
  const [show, setShow] = useState(false)
  useEffect(() => {
    document.title = '123'
  })
  return (
    <div>
      <div styleName="tooltip" style={show ? { visibility: 'visible' } : {}}>
        {text}
        <span styleName="tooltip-arrow" />
      </div>
      <div {...rest} onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
        {children}
      </div>
    </div>
  )
}

Tooltip.propTypes = {
  children: PropTypes.any,
  text: PropTypes.string
}
