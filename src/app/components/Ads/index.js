import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { ISAD } from 'Config'
import { loadScript } from '@/utils'

class Ads extends Component {
  static propTypes = {
    id: PropTypes.number
  }
  async componentDidMount() {
    if (ISAD) {
      const { id } = this.props
      const that = this
      loadScript('https://cos.mdb6.com/dddm/income.min.js', true, function() {
        console.log(income)
        if (income[id]) {
          const { type, content } = income[id]
          if (type === 2) {
            that.createAd(content)
          } else if (type === 1) {
            that.showAd(content)
          }
        }
      })
    }
  }

  createAd(url) {
    let script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = url
    console.log(url, this.props)
    this.ads.appendChild(script)
  }

  showAd(content) {
    this.ads.innerHTML = content
  }

  render() {
    return ISAD ? <div ref={e => (this.ads = e)} /> : null
  }
}

export default Ads
