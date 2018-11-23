import React, { Component, Fragment } from 'react'
import { Swipe } from '../../utils/swipe.min'
import './style.scss'

class SwiperMod extends Component {
  constructor(props) {
    super(props)
    this.mySwipe = null
  }

  componentDidMount() {

    const pager = document.querySelector('.pager')
    const bullets = pager.querySelectorAll('em')
    const that = this
    this.mySwipe = new Swipe(document.querySelector('.swipe'), {
      startSlide:0,
      speed:400,
      auto: 3000,
      continuous:!0,
      disableScroll:!1,
      stopPropagation:!1,
      callback: function(index) {
        that.slideTab(index, bullets)
      }
    })

    for (let i = 0; i < bullets.length; i++) {
      var elem = bullets[i]
      elem.setAttribute('data-tab', i)
      elem.onclick = function() {
        that.mySwipe.slide(parseInt(this.getAttribute('data-tab'), 10), 500)
      }
    }

  }

  slideTab(index, bullets) {
    var i = bullets.length;
    while (i--) {
      bullets[i].className = bullets[i].className.replace('on','')
    }
    bullets[index].className = 'on'
  };

  prev = () => {
    this.mySwipe.prev()
  }

  next = () => {
    this.mySwipe.next()
  }

  render() {
    return (
      <Fragment>
        <div className='swipe'>
          <div className='swipe-wrap'>
            <div><b>0</b></div>
            <div><b>1</b></div>
            <div><b>2</b></div>
          </div>
        </div>
        <div style={{textAlign: 'center', paddingTop: 20}}>
          <div className="pager">
            <em className="on">1</em>
            <em>2</em>
            <em>3</em>
          </div>
          <button onClick={this.prev}>prev</button>
          <button onClick={this.next}>next</button>
        </div>
      </Fragment>
    )
  }
}

export default SwiperMod;
