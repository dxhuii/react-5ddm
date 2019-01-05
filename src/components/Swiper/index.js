import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { slide } from '@/store/actions/slide'
import { getSlide } from '@/store/reducers/slide'

import { Swipe, SwipeItem } from 'swipejs/react'
import './style.scss'

@withRouter
@connect(
  state => ({
    slideData: getSlide(state)
  }),
  dispatch => ({
    slide: bindActionCreators(slide, dispatch)
  })
)
class Swiper extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 0
    }
    this.mySwipe = {}
  }

  static propTypes = {
    slideData: PropTypes.object,
    slide: PropTypes.func
  }

  componentDidMount() {
    this.mySwipe = { ...this.swipe.instance }
    const { slideData, slide } = this.props
    if (!slideData.data) {
      slide()
    }
  }

  handleCallback = index => {
    this.setState({ current: index })
  }

  onTransactionEnd = () => {
    this.mySwipe.restart()
  }

  prev = () => {
    this.mySwipe.prev()
  }

  next = () => {
    this.mySwipe.next()
  }

  onCur = index => {
    this.mySwipe.slide(parseInt(index, 10), 300)
  }

  render() {
    const {
      slideData: { loading, data = [] }
    } = this.props
    const { current } = this.state
    return (
      <div styleName="swiper">
        <Swipe
          ref={o => (this.swipe = o)}
          startSlide={0}
          speed={300}
          auto={3000}
          draggable={true}
          continuous={true}
          autoRestart={false}
          disableScroll={false}
          stopPropagation={false}
          callback={this.handleCallback}
          transitionEnd={this.onTransactionEnd}
        >
          {data.map(item => (
            <SwipeItem key={item.url}>
              <a href={item.url}>
                <img src={item.pic} />
                <p>{item.title}</p>
              </a>
            </SwipeItem>
          ))}
        </Swipe>
        <div styleName="page" ref={e => (this.page = e)}>
          {data.map((item, index) => (
            <em key={item.pic} styleName={index === current ? 'cur' : ''} onClick={() => this.onCur(index)}>
              {index + 1}
            </em>
          ))}
        </div>
        <ul styleName="title">
          {data.map((item, index) => (
            <a key={index} href={item.url} styleName={index === current ? 'cur' : ''}>
              <p>{item.title}</p>
            </a>
          ))}
        </ul>
        <div styleName="swiper-prev" onClick={this.prev}>
          <i className="iconfont">&#xe8ff;</i>
        </div>
        <div styleName="swiper-next" onClick={this.next}>
          <i className="iconfont">&#xe65e;</i>
        </div>
      </div>
    )
  }
}

export default Swiper
