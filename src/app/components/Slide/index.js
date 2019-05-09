import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { slide } from '@/store/actions/slide'
import { getSlide } from '@/store/reducers/slide'

import Swiper from '../Swiper'
import './style.scss'

@connect(
  state => ({
    slideData: getSlide(state)
  }),
  dispatch => ({
    slide: bindActionCreators(slide, dispatch)
  })
)
class Slide extends Component {
  static propTypes = {
    slideData: PropTypes.object,
    slide: PropTypes.func
  }

  componentDidMount() {
    const { slideData, slide } = this.props
    if (!slideData.data) {
      slide()
    }
  }

  render() {
    const {
      slideData: { data = [] }
    } = this.props
    return (
      <Swiper Pagination={true} Controller={true} Autoplay={3000} Start={0}>
        {data.map(item => (
          <div className="swipe-item" styleName="slide" key={item.url}>
            <a href={item.url}>
              <img src={item.pic} />
              <p>{item.title}</p>
            </a>
          </div>
        ))}
      </Swiper>
    )
  }
}

export default Slide
