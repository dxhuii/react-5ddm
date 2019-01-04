import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class GoogleAdSense extends PureComponent {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    style: PropTypes.object,
    client: PropTypes.string.isRequired,
    slot: PropTypes.string.isRequired
  }

  componentDidMount() {
    if (!window.adsbygoogle) {
      setTimeout(() => {
        this.componentDidMount()
      }, 2000)
      return
    }

    (adsbygoogle = window.adsbygoogle || []).push({})
  }

  render() {
    const { style, client, slot } = this.props

    return <ins className="adsbygoogle" style={style} data-ad-client={client} data-ad-slot={slot} />
  }
}
