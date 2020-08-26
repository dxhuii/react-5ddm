import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'

import { Swipe } from 'swipejs/react'
import './style.scss'

export default function Swiper({ Pagination, Controller, Autoplay = 0, Start = 0, Continuous = true, children }) {
  const [current, setCurrent] = useState(0)
  const swipe = useRef()

  const handleCallback = index => {
    setCurrent(index)
  }

  const onTransactionEnd = () => {
    swipe.current.instance.restart()
  }

  const prev = e => {
    e.stopPropagation()
    swipe.current.instance.prev()
  }

  const next = e => {
    e.stopPropagation()
    swipe.current.instance.next()
  }

  const onCur = index => {
    swipe.current.instance.slide(parseInt(index, 10), 300)
  }

  const elem = Array.from(Array(children.length), (v, k) => k) || []
  return (
    <div styleName='swiper'>
      <Swipe
        ref={swipe}
        startSlide={Start}
        speed={300}
        auto={Autoplay}
        draggable={true}
        continuous={Continuous}
        autoRestart={false}
        disableScroll={false}
        stopPropagation={false}
        callback={handleCallback}
        transitionEnd={onTransactionEnd}
      >
        {children}
      </Swipe>
      {Pagination ? (
        <div className='swiper-page'>
          {elem.map(item => (
            <em key={item} className={item === current ? 'cur' : ''} onClick={() => onCur(item)}>
              {item + 1}
            </em>
          ))}
        </div>
      ) : null}
      {Controller ? (
        <>
          <div className='swiper-prev' onClick={prev}>
            <i className='iconfont'>&#xe8ff;</i>
          </div>
          <div className='swiper-next' onClick={next}>
            <i className='iconfont'>&#xe65e;</i>
          </div>
        </>
      ) : null}
    </div>
  )
}

Swiper.propTypes = {
  children: PropTypes.array,
  Pagination: PropTypes.bool,
  Controller: PropTypes.bool,
  Continuous: PropTypes.bool,
  Start: PropTypes.number,
  Autoplay: PropTypes.number
}
