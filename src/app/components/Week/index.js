import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// redux
import { useStore, useSelector } from 'react-redux'
import { week } from '@/store/actions/list'
import { getList } from '@/store/reducers/list'

import Loading from '@/components/Ui/Loading'
import Item from '@/components/Week/Item'

import './style.scss'

export default function WeekDay({ id, title, link, isJp, type, linkText }) {
  const [current, setCurrent] = useState(0)
  const [tab, showTab] = useState(false)

  const info = useSelector(state => getList(state, 'week'))
  const store = useStore()

  useEffect(() => {
    const _week = args => week(args)(store.dispatch, store.getState)
    if (!info.data) {
      _week({ id })
    }
  }, [id, info.data, store.dispatch, store.getState])

  const getArea = (weekData = []) => {
    let cn = []
    let jp = []
    weekData.map(item => {
      if (item.area === '日本') {
        jp.push(item)
      } else if (item.area === '大陆') {
        cn.push(item)
      }
    })
    return [cn, jp]
  }

  const getEveryWeek = (weekData, isCN) => {
    // isCN  1 日本  其他为中国
    let data = {}
    let [Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday] = [[], [], [], [], [], [], []]
    weekData.map(item => {
      const day = item.weekday
      if (day === 1) {
        Monday.push(item)
      } else if (day === 2) {
        Tuesday.push(item)
      } else if (day === 3) {
        Wednesday.push(item)
      } else if (day === 4) {
        Thursday.push(item)
      } else if (day === 5) {
        Friday.push(item)
      } else if (day === 6) {
        Saturday.push(item)
      } else if (day === 7) {
        Sunday.push(item)
      }
    })
    data.Zero = isCN ? weekData.slice(0, 20) : weekData.slice(0, 16)
    data.Monday = Monday
    data.Tuesday = Tuesday
    data.Wednesday = Wednesday
    data.Thursday = Thursday
    data.Friday = Friday
    data.Saturday = Saturday
    data.Sunday = Sunday
    return data
  }

  const onWeek = () => {
    showTab(!tab)
  }

  const { data = [], loading } = info

  const weekCn = ['最新', '一', '二', '三', '四', '五', '六', '日']
  const weekEng = ['Zero', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const weekType = getArea(data)
  const weekData = type === -1 ? getEveryWeek(data) : getEveryWeek(weekType[type], type)
  return (
    <div styleName="index-week">
      <div className="title">
        {type !== -1 && (
          <h2>
            <i className={isJp ? 'title-icon' : 'title-icon cn'} /> {title}
          </h2>
        )}
        <div styleName="week-tab">
          <span onClick={onWeek}>最新</span>
          <ul styleName={`tab ${tab ? 'show' : ''}`} className={`${tab ? 'box' : ''}`}>
            {weekCn.map((item, index) => (
              <li key={index} onClick={() => setCurrent(index)} styleName={index === current ? 'active' : ''}>
                {`${index !== 0 ? '周' : ''}${item}`}
                {isJp && index !== 0 ? <em>{isJp[index]}</em> : ''}
              </li>
            ))}
          </ul>
        </div>
        {link ? (
          <Link to={link}>
            {linkText || '新番时间表'}
            <i className="iconfont">&#xe65e;</i>
          </Link>
        ) : null}
      </div>
      {loading ? <Loading /> : null}
      <Item data={weekData[weekEng[current]]} type={type} />
    </div>
  )
}

WeekDay.propTypes = {
  id: PropTypes.any,
  title: PropTypes.string,
  link: PropTypes.string,
  isJp: PropTypes.array,
  type: PropTypes.number,
  linkText: PropTypes.string
}
