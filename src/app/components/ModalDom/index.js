import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import './index.scss'

export default class ModalDom extends PureComponent {
  static propTypes = {
    closeModal: PropTypes.func,
    showModal: PropTypes.func,
    children: PropTypes.any,
    id: PropTypes.any
  }

  componentDidMount() {
    document.onkeyup = event => {
      if (event.which == '27') {
        this.closeModal(event)
      }
    }
  }

  showModal = e => {
    e.stopPropagation()
    document.querySelector('#modal').classList.remove('is-visible')
  }

  closeModal = e => {
    e.preventDefault()
    e.stopPropagation()
    document.querySelector('#modal').classList.add('is-visible')
  }

  render() {
    return (
      <div styleName="cd-popup" onClick={this.closeModal} id={this.props.id}>
        <div styleName="cd-popup-container" onClick={this.showModal}>
          {this.props.children}
          <span styleName="cd-popup-close img-replace" onClick={this.closeModal} />
        </div>
      </div>
    )
  }
}
