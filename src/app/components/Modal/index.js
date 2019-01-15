import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import './index.scss'

export default class Modal extends PureComponent {
  static propTypes = {
    visible: PropTypes.bool,
    closeModal: PropTypes.func,
    showModal: PropTypes.func,
    children: PropTypes.any,
    cls: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.visible === prevState.visible) {
      return null
    }
    const { visible } = nextProps
    return { visible }
  }

  componentDidMount() {
    document.onkeyup = event => {
      if (this.state.visible) {
        if (event.which == '27') {
          this.props.closeModal()
        }
      }
    }
  }

  showModal = e => {
    e.stopPropagation()
    this.props.showModal()
  }

  closeModal = e => {
    e.preventDefault()
    e.stopPropagation()
    this.props.closeModal()
  }

  render() {
    const { visible } = this.state
    return (
      <div styleName={`cd-popup ${visible ? 'is-visible' : ''}`} role="alert" onClick={this.closeModal}>
        <div styleName="cd-popup-container" onClick={this.showModal} style={this.props.cls}>
          {this.props.children}
          <span styleName="cd-popup-close img-replace" onClick={this.closeModal} />
        </div>
      </div>
    )
  }
}
