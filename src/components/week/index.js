import React from 'react'
import { Link } from 'react-router-dom'
import Tabs from '../tabs'
import css from './style.scss'
import { isNumber } from '../../utils'


export default ({ title, weekData, moreLink, isCN = false, isJp }) => {
  const weekCn = ['最新', '一', '二', '三', '四', '五', '六', '日']
  const weekEng = ['Zero', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  return (
    <Tabs
      icon={<svg t="1497345161159" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15014"><path d="M596.6 356l-13.2-8.1 166.5-229c11.1-15.3 7.7-37-7.6-48.1-15.3-11.1-37-7.7-48.1 7.6L524.6 311.6 255.6 146c-16.1-9.9-37.4-4.9-47.4 11.3-9.9 16.1-4.9 37.4 11.3 47.4L484 367.5l-25.3 34.8c-11.1 15.3-7.7 37 7.6 48.1 15.3 11.1 37 7.7 48.1-7.6l28.4-39.1 17.7 10.9c16.1 9.9 37.4 4.9 47.4-11.3 9.9-16.1 4.9-37.4-11.3-47.3z" fill="#FB813A" p-id="15015"></path><path d="M790.6 900.4m-59.2 0a59.2 59.2 0 1 0 118.4 0 59.2 59.2 0 1 0-118.4 0Z" fill="#FB813A" p-id="15016"></path><path d="M233.4 900.4m-59.2 0a59.2 59.2 0 1 0 118.4 0 59.2 59.2 0 1 0-118.4 0Z" fill="#FB813A" p-id="15017"></path><path d="M851.9 911.9H172.1c-39.3 0-71.4-32.1-71.4-71.4V377.4c0-39.3 32.1-71.4 71.4-71.4h679.7c39.3 0 71.4 32.1 71.4 71.4v463.1c0.1 39.3-32 71.4-71.3 71.4z" fill="#FDDE80" p-id="15018"></path><path d="M520.8 595.1m-142.3 0a142.3 142.3 0 1 0 284.6 0 142.3 142.3 0 1 0-284.6 0Z" fill="#FFFFFF" p-id="15019"></path><path d="M472.7 511.1c0-1 0.7-1.5 1.7-1L619.8 594c0.9 0.5 0.9 1.4 0 1.9l-145.4 83.9c-0.9 0.5-1.7 0.1-1.7-1V511.1z" fill="#FB813A" p-id="15020"></path></svg>}
      title={title}
      moreLink={moreLink}
      moreTitle="新番时间表"
      isJp={isJp}
    >
      {
        weekCn.map((week, index) => <ul className={isCN ? `${css.week} ${css.weekCn}` : css.week} name={week} key={week}>
        {
          weekData[weekEng[index]].map(item => <li key={item.id}>
            <Link
              key={item.id}
              to={`/bangumi/${item.id}`}
            >
                <div>
                  <img alt={item.title} src={item.pic} />
                </div>
                <h4>{item.title}</h4>
            </Link>
            {isNumber(item.status) ? <p>更新至<Link className={item.isDate ? css.today : ''} to={`/play/${item.id}/${item.pid}`}>{item.status}话</Link></p> : <p><Link to={`/play/${item.id}/${item.pid}`}>{item.status}</Link></p>}
            </li>
          )
        }
      </ul>)
      }
    </Tabs>
  )
}
