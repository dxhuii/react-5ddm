import React, { PureComponent } from 'react'

export default class Tooltip extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      show: false
    }
    this.style = {
      tooltip: {
        position: 'relative',
        backgroundColor: 'rgba(0,0,0,0.7)',
        color: 'white',
        visibility: 'hidden',
        width: 'fit-content',
        padding: 5,
        borderRadius: 5,
        fontSize: 14
      },
      tooltipArrow: {
        position: 'absolute',
        top: '100%',
        left: 20,
        borderWidth: 5,
        borderStyle: 'solid',
        borderColor: 'rgba(0,0,0,0.7) transparent transparent'
      },
      visible: {
        visibility: 'visible'
      }
    }
    this.showTooltip = this.toggleTooltip.bind(this, true)
    this.hideTooltip = this.toggleTooltip.bind(this, false)
  }

  toggleTooltip = tooltipState => {
    this.setState({
      show: tooltipState
    })
  }

  render() {
    const { children, text, ...rest } = this.props
    const { show } = this.state
    const { visible, tooltip, tooltipArrow } = this.style
    const showTooltip = show ? visible : {}
    return (
      <div>
        <div style={{ ...tooltip, ...showTooltip }}>
          {text}
          <span style={tooltipArrow} />
        </div>
        <div {...rest} onMouseEnter={this.showTooltip} onMouseLeave={this.hideTooltip}>
          {children}
        </div>
      </div>
    )
  }
}
