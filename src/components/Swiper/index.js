import React, { Component, Fragment } from 'react'
import { Swipe, SwipeItem } from 'swipejs/react'
import './style.scss'

export default class Swiper extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.mySwipe = {}
    this.bullets = []
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
          <SwipeItem onClick={this.handleClick}>Slide One</SwipeItem>
          <SwipeItem onClick={this.handleClick.bind(this)}>Slide Two</SwipeItem>
          <SwipeItem onClick={this.handleClick.bind(this)}>Slide Three</SwipeItem>
        </Swipe>
        <div id="page" styleName="page">
          <em className="page-em__on">1</em>
          <em>2</em>
          <em>3</em>
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
