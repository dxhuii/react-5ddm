import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { weekLoad } from '../../actions/week';
import { getWeekByListId } from '../../reducers/week';

import Shell from '../../components/shell';
import Meta from '../../components/meta';

import CSSModules from 'react-css-modules';
import styles from './style.scss';

import WeekDay from '../../components/week'
import Top from '../../components/top'

@withRouter
@connect(
  (state, props) => ({
    week: getWeekByListId(state, 'weekList')
  }),
  dispatch => ({
    weekLoad: bindActionCreators(weekLoad, dispatch)
  })
)
@Shell
@CSSModules(styles)
export class Week extends Component {

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

  render() {
    const { week: { data } } = this.props
    const weekType = this.getArea(data)
    return(
      <div>
        <Meta title="星期" keywords="星期, 番表" description="星期" />
        <section className="wp">
          <aside styleName="indexleft">
            <WeekDay title="番剧" moreLink="/" isJp={['', '月','火','水','木','金','土','日']} weekData={this.getEveryWeek(weekType[1], 1)} />
          </aside>
          <Top order="hits_month" area="CN" />
          <Top order="hits_month" area="JP" />
          <Top />
        </section>
        <section className="wp">
          <aside styleName="indexleft">
            <WeekDay title="国创" moreLink="/" isCN={true} weekData={this.getEveryWeek(weekType[0], 0)} />
          </aside>
        </section>
      </div>
    )
  }
}

export default Week
