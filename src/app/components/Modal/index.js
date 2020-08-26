import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import './index.scss'

export default function Modal({ closeModal, showModal, children, cls, visible }) {
  const showModals = e => {
    e.stopPropagation()
    showModal()
  }

  const closeModals = e => {
    e.preventDefault()
    e.stopPropagation()
    closeModal()
  }

  useEffect(() => {
    document.onkeyup = event => {
      if (visible) {
        if (event.which === 27) {
          closeModal()
        }
      }
    }
  })

  return (
    <div styleName={`cd-popup ${visible ? 'is-visible' : ''}`} role='alert' onClick={closeModals}>
      <div styleName='cd-popup-container' onClick={showModals} style={cls}>
        {children}
        <span styleName='cd-popup-close img-replace' onClick={closeModals} />
      </div>
    </div>
  )
}

Modal.propTypes = {
  visible: PropTypes.bool,
  closeModal: PropTypes.func,
  showModal: PropTypes.func,
  children: PropTypes.any,
  cls: PropTypes.object
}
