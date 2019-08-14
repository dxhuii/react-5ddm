import React, { useState } from 'react'
import PropTypes from 'prop-types'

// redux
import { useStore } from 'react-redux'
import { addgold } from '@/store/actions/mark'
import { comment } from '@/store/actions/comment'

import Toast from '@/components/Toast'

import './style.scss'

export default function Tating({ data, id, sid }) {
  const starText = ['很差', '较差', '还行', '推荐', '力荐']
  const [starWith, setStarWith] = useState(16)
  const [star, setStar] = useState(16)
  const store = useStore()

  const onStar = async index => {
    setStarWith(index * 16)
    setStar(index)
    const onAddgold = args => addgold(args)(store.dispatch, store.getState)
    const getComment = args => comment(args)(store.dispatch, store.getState)
    let [, data] = await onAddgold({ id, val: index })
    if (data.code === 1) {
      getComment({ id, sid })
      Toast.success(data.msg)
    }
  }

  const starClass = pfnum => {
    var pfclass = ''
    if (pfnum >= 50) {
      pfclass = 'bigstar50'
    } else if (pfnum >= 45) {
      pfclass = 'bigstar45'
    } else if (pfnum >= 40) {
      pfclass = 'bigstar40'
    } else if (pfnum >= 35) {
      pfclass = 'bigstar35'
    } else if (pfnum >= 30) {
      pfclass = 'bigstar30'
    } else if (pfnum >= 35) {
      pfclass = 'bigstar35'
    } else if (pfnum >= 20) {
      pfclass = 'bigstar20'
    } else if (pfnum >= 15) {
      pfclass = 'bigstar15'
    } else if (pfnum >= 10) {
      pfclass = 'bigstar10'
    } else if (pfnum >= 5) {
      pfclass = 'bigstar5'
    } else if (pfnum >= 0) {
      pfclass = 'bigstar0'
    }
    return pfclass
  }

  const show = (data, text) => {
    const { a, b, c, d, e, pinfen } = data
    if (pinfen > 0) {
      const total = a + b + c + d + e
      const calc = val => `${((val / total) * 100).toFixed(2)}%`
      const progressBar = val => <div styleName="progress-bar" style={{ width: calc(val) }} />
      const scoreArr = [a, b, c, d, e]
      return (
        <div styleName="rating" className="pr">
          <h4>评分</h4>
          <div styleName="rating-num">
            <strong>{pinfen === '10.0' ? 10 : pinfen}</strong>
            <span className={starClass(parseFloat(pinfen) * 5)} />
            <span styleName="people">
              <em>{total}</em>人评价
            </span>
          </div>
          <ul styleName="rating-show" className="clearfix">
            {scoreArr.map((item, index) => (
              <li key={index}>
                <span>{text[scoreArr.length - (index + 1)]}</span>
                <div styleName="progress" title={calc(item)}>
                  {progressBar(item)}
                </div>
                <em>{item}人</em>
              </li>
            ))}
          </ul>
        </div>
      )
    } else {
      return <div styleName="noscore">还没有评分</div>
    }
  }

  const move = index => {
    setStar(index)
  }

  return (
    <>
      {show(data, starText)}
      <div styleName="starBox">
        <em>评分</em>
        <div styleName="starlist">
          {[1, 2, 3, 4, 5].map(item => (
            <a key={item} title={`${item}星`} styleName={`star_${item}`} onClick={() => onStar(item)} onMouseOver={() => move(item)} />
          ))}
        </div>
        <div styleName="star_current" style={{ width: starWith }} />
        <span>{starText[star - 1]}</span>
      </div>
    </>
  )
}

Tating.propTypes = {
  data: PropTypes.object,
  id: PropTypes.number,
  sid: PropTypes.number,
  uid: PropTypes.number
}
