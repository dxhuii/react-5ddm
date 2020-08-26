import React, { useState, useEffect } from 'react'

// redux
import { useStore, useSelector } from 'react-redux'
import { week } from '@/store/actions/list'
import { getList } from '@/store/reducers/list'

import Loading from '@/components/Ui/Loading'
import Item from '@/components/Week/Item/out'

import './out.scss'

export default () => {
  const [current, setCurrent] = useState(0)

  const info = useSelector(state => getList(state, 'week'))
  const store = useStore()

  useEffect(() => {
    const _week = () => week()(store.dispatch, store.getState)
    if (!info.data) {
      _week()
    }
  }, [info.data, store.dispatch, store.getState])

  const getEveryWeek = weekData => {
    const data = {}
    const [Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday] = [[], [], [], [], [], [], []]
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
    data.Zero = weekData.slice(0, 20)
    data.Monday = Monday
    data.Tuesday = Tuesday
    data.Wednesday = Wednesday
    data.Thursday = Thursday
    data.Friday = Friday
    data.Saturday = Saturday
    data.Sunday = Sunday
    return data
  }

  const { data = [], loading } = info

  const weekCn = ['最新', '一', '二', '三', '四', '五', '六', '日']
  const weekEng = ['Zero', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const weekData = getEveryWeek(data)
  if (loading) return <Loading />
  return (
    <>
      <div className='title'>
        <div styleName='week-tab'>
          <ul styleName='tab'>
            {weekCn.map((item, index) => (
              <li key={index} onClick={() => setCurrent(index)} styleName={index === current ? 'active' : ''}>
                {`${index !== 0 ? '周' : ''}${item}`}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Item data={weekData[weekEng[current]]} />
    </>
  )
}
