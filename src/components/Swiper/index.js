import React, { Component } from 'react'
import './style.scss'

class SwiperMod extends Component {
  componentDidMount() {
    window.mySwipe = new Swipe(document.getElementById('slider'), {
      startSlide: 2,
      speed: 400,
      auto: 3000,
      continuous: true,
      disableScroll: false,
      stopPropagation: false,
      callback: function(index, elem) {},
      transitionEnd: function(index, elem) {}
    });
  }
  render() {
    return (
      <div id='mySwipe' style={{maxWidth: 500,margin:'0 auto'}} className='swipe'>
        <div className='swipe-wrap'>
          <div><b>0</b></div>
          <div><b>1</b></div>
          <div><b>2</b></div>
          <div><b>3</b></div>
          <div><b>4</b></div>
          <div><b>5</b></div>
          <div><b>6</b></div>
          <div><b>7</b></div>
          <div><b>8</b></div>
          <div><b>9</b></div>
          <div><b>10</b></div>
          <div><b>11</b></div>
          <div><b>12</b></div>
          <div><b>13</b></div>
          <div><b>14</b></div>
          <div><b>15</b></div>
          <div><b>16</b></div>
          <div><b>17</b></div>
          <div><b>18</b></div>
          <div><b>19</b></div>
          <div><b>20</b></div>
        </div>
      </div>
    )
  }
}

export default SwiperMod;
