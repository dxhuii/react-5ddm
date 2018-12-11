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
    this.state = {}
    this.mySwipe = {}
    this.bullets = []
  }

  static propTypes = {
    slideData: PropTypes.object,
    slide: PropTypes.func
  }

  componentDidMount() {
    this.mySwipe = { ...this.swipe.instance }
    const page = document.querySelector('#page')
    this.bullets = page.querySelectorAll('em')
    const that = this

    for (let i = 0; i < this.bullets.length; i++) {
      var elem = this.bullets[i]
      elem.setAttribute('data-tab', i)
      elem.onclick = function() {
        that.mySwipe.slide(parseInt(this.getAttribute('data-tab'), 10), 500)
      }
    }

    const { slideData, slide } = this.props
    if (!slideData.data) {
      slide()
    }
  }

  handleCallback = index => {
    this.slideTab(index, this.bullets)
  }

  onTransactionEnd = () => {
    this.mySwipe.restart()
  }

  slideTab(index, bullets) {
    var i = bullets.length
    while (i--) {
      bullets[i].className = bullets[i].className.replace('page-em__on', '')
    }
    bullets[index].className = 'page-em__on'
  }

  prev = () => {
    this.mySwipe.prev()
  }

  next = () => {
    this.mySwipe.next()
  }

  handleClick = e => {
    // Your own logic
  }

  render() {
    const {
      slideData: { loading, data = [] }
    } = this.props
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
            <SwipeItem key={item.url} onClick={this.handleClick}>
              <a href={item.url}>
                <img src={item.pic} />
              </a>
            </SwipeItem>
          ))}
        </Swipe>
        <div id="page" styleName="page">
          {data.map((item, index) => (
            <em key={item.pic} className={index === 0 ? 'page-em__on' : ''}>
              {index + 1}
            </em>
          ))}
        </div>
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
