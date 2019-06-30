import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { week } from '@/store/actions/list'
import { getList } from '@/store/reducers/list'

import Loading from '@/components/Ui/Loading'
import Item from '@/components/Week/Item/out'

import './out.scss'

@withRouter
@connect(
  state => ({
    weekData: getList(state, 'week')
  }),
  dispatch => ({
    week: bindActionCreators(week, dispatch)
  })
)
class weekDay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentIndex: 0
    }
  }

  static propTypes = {
    weekData: PropTypes.object,
    week: PropTypes.func,
    id: PropTypes.any,
    type: PropTypes.number
  }

  componentDidMount() {
    const { weekData, week } = this.props
    if (!weekData.data) {
      week()
    }
  }

  getEveryWeek(weekData) {
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

  render() {
    const {
      weekData: { data = [], loading }
    } = this.props
    const { currentIndex } = this.state
    const weekCn = ['最新', '一', '二', '三', '四', '五', '六', '日']
    const weekEng = ['Zero', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const weekData = this.getEveryWeek(data)
    return (
      <Fragment>
        <div className="title">
          <div styleName="week-tab">
            <ul styleName="tab">
              {weekCn.map((item, index) => (
                <li key={index} onClick={() => this.setState({ currentIndex: index })} styleName={index === currentIndex ? 'active' : ''}>
                  {`${index !== 0 ? '周' : ''}${item}`}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {loading ? <Loading /> : null}
        <Item data={weekData[weekEng[currentIndex]]} />
      </Fragment>
    )
  }
}

export default weekDay
