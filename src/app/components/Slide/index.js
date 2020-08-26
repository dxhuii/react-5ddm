import React, { useEffect } from 'react'

// redux
import { useStore, useSelector } from 'react-redux'
import { slide } from '@/store/actions/slide'
import { getSlide } from '@/store/reducers/slide'

import Swiper from '../Swiper'
import './style.scss'

export default () => {
  const info = useSelector(state => getSlide(state))
  const store = useStore()

  useEffect(() => {
    const _slide = args => slide(args)(store.dispatch, store.getState)
    if (!info.data) {
      _slide()
    }
  }, [store.dispatch, store.getState, info.data])

  const { data = [] } = info
  return (
    <Swiper Pagination={true} Controller={true} Autoplay={3000} Start={0}>
      {data.map(item => (
        <div className='swipe-item' styleName='slide' key={item.url}>
          <a href={item.url}>
            <img src={item.pic} />
            <p>{item.title}</p>
          </a>
        </div>
      ))}
    </Swiper>
  )
}
