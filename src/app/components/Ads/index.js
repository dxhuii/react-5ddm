import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ads } from '@/store/actions/ads'
import { getAds } from '@/store/reducers/ads'

import { isMobile } from '@/utils'

@withRouter
@connect(
  (state, props) => ({
    adsData: getAds(state, props.id),
    adsMData: getAds(state, props.mid)
  }),
  dispatch => ({
    ads: bindActionCreators(ads, dispatch)
  })
)
class Ads extends Component {
  static propTypes = {
    id: PropTypes.number,
    mid: PropTypes.number,
    adsData: PropTypes.object,
    adsMData: PropTypes.object,
    ads: PropTypes.func
  }
  componentDidMount() {
    const { id, ads, mid, adsData, adsMData } = this.props
    if (!adsData.data) {
      ads({ id })
    }
    if (mid) {
      if (!adsMData.data) {
        ads({ id: mid })
      }
    }
  }

  render() {
    const {
      adsData: { data = {} },
      adsMData
    } = this.props
    const content = data.content
    const mContent = (adsMData.data || {}).content
    const ads = !isMobile() ? <div dangerouslySetInnerHTML={{ __html: content }} /> : mContent ? <div>m</div> : null
    return ads
  }
}

export default Ads
