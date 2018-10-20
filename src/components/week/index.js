import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { weekLoad } from '../../actions/week';
import { getWeekByListId } from '../../reducers/week';

import { isNumber } from '../../utils'

import CSSModules from 'react-css-modules'
import styles from './style.scss'

import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Tab from 'react-bootstrap/lib/Tab'
import Nav from 'react-bootstrap/lib/Nav'

const weekCn = ['最新', '一', '二', '三', '四', '五', '六', '日']
const weekEng = ['Zero', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
@withRouter
@connect(
  (state, props) => ({
    week: getWeekByListId(state, 'weekList')
  }),
  dispatch => ({
    weekLoad: bindActionCreators(weekLoad, dispatch)
  })
)
@CSSModules(styles, { allowMultiple: true })
class WeekDay extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      key: 'home_0',
    };
  }

  componentDidMount() {
    const { week, weekLoad } = this.props
    const id = 'weekList'
    if (week && !week.data) {
      weekLoad({ id })
    }
  }

  getArea(weekData = []){
    let cn = [],
        jp = [];
    weekData.map(item => {
      if(item.area === '日本'){
        jp.push(item)
      }else if(item.area === '大陆'){
        cn.push(item)
      }
    })
    return [cn, jp]
  }

  getEveryWeek(weekData, isCN){ // isCN  1 日本  其他为中国
    let data = {}
    let [Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday] = [[],[],[],[],[],[],[]]
    weekData.map(item => {
      const day = item.weekday
      if(day === 1){
        Monday.push(item)
      } else if(day === 2){
        Tuesday.push(item)
      } else if(day === 3){
        Wednesday.push(item)
      } else if(day === 4){
        Thursday.push(item)
      } else if(day === 5){
        Friday.push(item)
      } else if(day === 6){
        Saturday.push(item)
      } else if(day === 7){
        Sunday.push(item)
      }
    })
    data.Zero = isCN ? weekData.slice(0, 20) : weekData.slice(0, 12);
    data.Monday = Monday
    data.Tuesday = Tuesday
    data.Wednesday = Wednesday
    data.Thursday = Thursday
    data.Friday = Friday
    data.Saturday = Saturday
    data.Sunday = Sunday
    return data
  }

  render(){
    const { title, isCN = false, week: { data } } = this.props
    const weekType = this.getArea(data)
    const isType = isCN ? 0 : 1
    const weekData = this.getEveryWeek(weekType[isType], isType)
    return(
      <Tab.Container id="week" defaultActiveKey="tab0">
        <Nav variant="pills">
          <h2 styleName='title'><Nav.Item><svg t="1497345161159" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15014"><path d="M596.6 356l-13.2-8.1 166.5-229c11.1-15.3 7.7-37-7.6-48.1-15.3-11.1-37-7.7-48.1 7.6L524.6 311.6 255.6 146c-16.1-9.9-37.4-4.9-47.4 11.3-9.9 16.1-4.9 37.4 11.3 47.4L484 367.5l-25.3 34.8c-11.1 15.3-7.7 37 7.6 48.1 15.3 11.1 37 7.7 48.1-7.6l28.4-39.1 17.7 10.9c16.1 9.9 37.4 4.9 47.4-11.3 9.9-16.1 4.9-37.4-11.3-47.3z" fill="#FB813A" p-id="15015"></path><path d="M790.6 900.4m-59.2 0a59.2 59.2 0 1 0 118.4 0 59.2 59.2 0 1 0-118.4 0Z" fill="#FB813A" p-id="15016"></path><path d="M233.4 900.4m-59.2 0a59.2 59.2 0 1 0 118.4 0 59.2 59.2 0 1 0-118.4 0Z" fill="#FB813A" p-id="15017"></path><path d="M851.9 911.9H172.1c-39.3 0-71.4-32.1-71.4-71.4V377.4c0-39.3 32.1-71.4 71.4-71.4h679.7c39.3 0 71.4 32.1 71.4 71.4v463.1c0.1 39.3-32 71.4-71.3 71.4z" fill="#FDDE80" p-id="15018"></path><path d="M520.8 595.1m-142.3 0a142.3 142.3 0 1 0 284.6 0 142.3 142.3 0 1 0-284.6 0Z" fill="#FFFFFF" p-id="15019"></path><path d="M472.7 511.1c0-1 0.7-1.5 1.7-1L619.8 594c0.9 0.5 0.9 1.4 0 1.9l-145.4 83.9c-0.9 0.5-1.7 0.1-1.7-1V511.1z" fill="#FB813A" p-id="15020"></path></svg> {title}</Nav.Item></h2>
          {weekCn.map((week, index) => <Nav.Item key={week}><Nav.Link eventKey={`tab${index}`}>{ `${ index !== 0 ? '周' : ''}${week}` }</Nav.Link></Nav.Item>)}
        </Nav>
        <Tab.Content>
        {
          weekCn.map((week, index) =>
            <Tab.Pane eventKey={`tab${index}`} styleName={isCN ? 'week weekCn' : 'week'} key={week}>
            <Row>
            {
              weekData[weekEng[index]].map(item =>
                <Col styleName='list' xs={6} md={6} lg={4} xl={3} key={item.id}>
                  <Link
                    key={item.id}
                    to={`/bangumi/${item.id}`}
                  >
                      <div styleName='pic'>
                        <img alt={item.title} src={item.pic} />
                      </div>
                      <h4>{item.title}</h4>
                  </Link>
                  {isNumber(item.status) ? <p>更新至<Link styleName={item.isDate ? 'today' : ''} to={`/play/${item.id}/${item.pid}`}>{item.status}话</Link></p> : <p><Link to={`/play/${item.id}/${item.pid}`}>{item.status}</Link></p>}
                </Col>
              )
            }
            </Row>
            </Tab.Pane>
          )
        }
        </Tab.Content>
      </Tab.Container>
    )
  }
}

export default WeekDay
