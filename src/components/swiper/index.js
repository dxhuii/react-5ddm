import React, { Component } from 'react';
import Swiper from 'swiper'
import './style.scss'

class SwiperMod extends Component {
  componentDidMount() {
    new Swiper('.swiper-container', {
      pagination: {
        el: '.swiper-pagination',
      },
    });
  }
  render() {

    return (
      <div className="swiper-container">
        <div className="swiper-wrapper">
          <div className="swiper-slide">Slide 1</div>
          <div className="swiper-slide">Slide 2</div>
          <div className="swiper-slide">Slide 3</div>
        </div>
        <div className="swiper-pagination"></div>
      </div>
    )
  }
}

export default SwiperMod;
