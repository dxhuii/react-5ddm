import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { week } from '@/store/actions/week'
import { getWeek } from '@/store/reducers/week'

import Loading from '@/components/Ui/Loading'

import { isNumber, formatPic } from '@/utils'

import './style.scss'

@withRouter
@connect(
  state => ({
    weekData: getWeek(state)
  }),
  dispatch => ({
    week: bindActionCreators(week, dispatch)
  })
)
class weekDay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentIndex: 0,
      onWeekShow: false
    }
  }

  static propTypes = {
    weekData: PropTypes.object,
    week: PropTypes.func,
    id: PropTypes.any,
    title: PropTypes.string,
    link: PropTypes.string,
    isJp: PropTypes.array,
    type: PropTypes.number,
    linkText: PropTypes.string
  }

  componentDidMount() {
    const { weekData, week, id } = this.props
    if (!weekData.data) {
      week({ id })
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

  getEveryWeek(weekData, isCN) {
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

  onWeek = () => {
    this.setState({
      onWeekShow: !this.state.onWeekShow
    })
  }

  render() {
    const {
      title,
      weekData: { data = [], loading },
      link,
      isJp,
      type,
      linkText
    } = this.props
    const { currentIndex, onWeekShow } = this.state
    const weekCn = ['最新', '一', '二', '三', '四', '五', '六', '日']
    const weekEng = ['Zero', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const weekType = this.getArea(data)
    const weekData = this.getEveryWeek(weekType[type], type)
    return (
      <Fragment>
        <div className="title">
          <h2>
            <i className={isJp ? 'title-icon' : 'title-icon cn'} /> {title}
          </h2>
          <div styleName="week-tab">
            <span onClick={this.onWeek}>最新</span>
            <ul styleName={`tab ${onWeekShow ? 'show' : ''}`} className={`${onWeekShow ? 'box' : ''}`}>
              {weekCn.map((item, index) => (
                <li key={index} onClick={() => this.setState({ currentIndex: index })} styleName={index === currentIndex ? 'active' : ''}>
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
        <ul styleName={type === 0 ? 'week weekCn' : 'week'}>
          {loading ? <Loading /> : null}
          {weekData[weekEng[currentIndex]].map(item => (
            <li key={item.id}>
              <Link key={item.id} to={`/subject/${item.id}`}>
                <div
                  className="load-demand"
                  data-load-demand={`<img src="${formatPic(item.smallPic || item.pic, 'thumb150')}" alt="${item.title}" />`}
                />
                <h4>{item.title}</h4>
              </Link>
              {isNumber(item.status) ? (
                item.isDate ? (
                  <p>
                    更新至
                    <Link styleName="today" to={`/play/${item.id}/${item.pid}`}>
                      {item.status}话
                    </Link>
                  </p>
                ) : (
                  <p>
                    更新至<Link to={`/play/${item.id}/${item.pid}`}>{item.status}话</Link>
                  </p>
                )
              ) : (
                <p styleName="no">
                  {item.isDate ? (
                    <Link styleName={item.isDate ? 'today' : ''} to={`/play/${item.id}/${item.pid}`}>
                      {item.status}
                    </Link>
                  ) : (
                    <Link to={`/play/${item.id}/${item.pid}`}>{item.status}</Link>
                  )}
                </p>
              )}
            </li>
          ))}
        </ul>
      </Fragment>
    )
  }
}

export default weekDay
