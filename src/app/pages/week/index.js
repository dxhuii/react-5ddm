import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { week } from '@/store/actions/week'
import { getWeek } from '@/store/reducers/week'

import BaseLayout from '@/layout/baseLayout'
import Loading from '@/components/Ui/Loading'
import ItemS from '@/components/Week/ItemS'
import Shell from '@/components/Shell'
import Meta from '@/components/Meta'

import './style.scss'

@Shell
@withRouter
@connect(
  state => ({
    weekData: getWeek(state)
  }),
  dispatch => ({
    week: bindActionCreators(week, dispatch)
  })
)
class Week extends PureComponent {
  static propTypes = {
    weekData: PropTypes.object,
    week: PropTypes.func,
    match: PropTypes.object
  }

  componentDidMount() {
    this.getData()
  }

  componentDidUpdate(prevProps) {
    // 当 url 参数参数发生改变时，重新进行请求
    let oldId = prevProps.match.params.id
    let newId = this.props.match.params.id
    if (newId !== oldId) this.getData()
  }

  getData = () => {
    const { weekData, week } = this.props
    if (!weekData.data) {
      week()
    }
  }

  getArea(weekData = []) {
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

  getEveryWeek(weekData) {
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
    data.Monday = Monday
    data.Tuesday = Tuesday
    data.Wednesday = Wednesday
    data.Thursday = Thursday
    data.Friday = Friday
    data.Saturday = Saturday
    data.Sunday = Sunday
    return data
  }
  render() {
    const {
      weekData: { data = [], loading },
      match: {
        params: { id }
      }
    } = this.props
    const weekCn = ['一', '二', '三', '四', '五', '六', '日']
    const weekEng = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const weekType = this.getArea(data)
    const weekData = id === '0' || id === '1' ? this.getEveryWeek(weekType[id], id) : this.getEveryWeek(data)
    const today = new Date().getDay() - 1
    const title = id === '1' ? '日本' : id === '0' ? '国产' : ''
    return (
      <BaseLayout>
        <div className="wp mt20">
          <Meta title={`${title}新番时间表`}>
            <meta name="keywords" content={`${title}新番时间表,${title}动漫时间表`} />
            <meta name="description" content={`${title}新番时间表`} />
          </Meta>
          {loading ? <Loading /> : null}
          <ul styleName="list">
            {weekCn.map((item, index) => (
              <li key={item} styleName={today === index ? 'active' : ''}>
                {item}
              </li>
            ))}
          </ul>
          <ul styleName="weeklist">
            {weekEng.map((obj, index) => (
              <ItemS key={obj} data={weekData[weekEng[index]]} type={2} />
            ))}
          </ul>
        </div>
      </BaseLayout>
    )
  }
}

export default Week
