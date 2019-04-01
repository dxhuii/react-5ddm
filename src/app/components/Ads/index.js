import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ads } from '@/store/actions/ads'
import { getAds } from '@/store/reducers/ads'

import { ISAD, DOMAIN_NAME } from 'Config'

const reId = id => {
  let r = id
  if (DOMAIN_NAME === 'dddm.tv') {
    switch (id) {
      case 20:
        r = 33
        break
      case 21:
        r = 35
        break
      case 22:
        r = 37
        break
      default:
        r = id
    }
  }
  return r
}

/**
 * 24 手机底部固定位-深蓝广告
 * 25 全站右下角悬浮广告 PC
 * 26 手机端播放列表下广告位
 * 27 手机全站底漂
 * 31 手机端播放列表上广告位
 */
const adsId = /24|25|26|27|31/

@withRouter
@connect(
  (state, props) => ({
    adsData: getAds(state, reId(props.id))
  }),
  dispatch => ({
    ads: bindActionCreators(ads, dispatch)
  })
)
class Ads extends Component {
  static propTypes = {
    id: PropTypes.number,
    adsData: PropTypes.object,
    ads: PropTypes.func
  }
  async componentDidMount() {
    if (ISAD) {
      const { id, ads, adsData } = this.props
      if (!adsData.data) {
        let [, data] = await ads({ id: reId(id) })
        if (data && adsId.test(id)) {
          const url = data.data.content
          if (url) {
            this.createAd(url)
          }
        }
      } else {
        const url = adsData.data.content
        if (adsId.test(id) && url) {
          this.createAd(url)
        }
      }
    }
  }

  createAd(url) {
    let script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = url
    console.log(url, this.props)
    this.ads.appendChild(script)
  }

  showAd() {
    const {
      adsData: { data = {} }
    } = this.props
    const content = data.content
    return <div dangerouslySetInnerHTML={{ __html: content }} />
  }

  render() {
    const { id } = this.props
    return ISAD ? adsId.test(id) ? <div ref={e => (this.ads = e)} /> : this.showAd() : null
  }
}

export default Ads
