import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import Tabs from '../tabs'
import css from './style.scss'
import { isNumber } from '../../utils'

import Tabs from 'react-bootstrap/lib/Tabs'
import Tab from 'react-bootstrap/lib/Tab'
import Nav from 'react-bootstrap/lib/Nav'

const weekCn = ['最新', '一', '二', '三', '四', '五', '六', '日']
const weekEng = ['Zero', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export default class WeekDay extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      key: 'home_0',
    };
  }

  render(){
    const { title, weekData, moreLink, isCN = false } = this.props
    return(
      <Tab.Container id="week" defaultActiveKey="tab0">
        <Nav variant="pills">
          <h2><Nav.Item>2222</Nav.Item></h2>
          {weekCn.map((week, index) => <Nav.Item key={week}><Nav.Link eventKey={`tab${index}`}>{ `${ index !== 0 ? '周' : ''}${week}` }</Nav.Link></Nav.Item>)}
        </Nav>
        <Tab.Content>
        {
          weekCn.map((week, index) => 
            <Tab.Pane eventKey={`tab${index}`} className={isCN ? `${css.week} ${css.weekCn}` : css.week} key={week}>
            {
              weekData[weekEng[index]].map(item =>
                <li key={item.id}>
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
            </Tab.Pane>
          )
        }
        </Tab.Content>
      </Tab.Container>
    )
  }
}