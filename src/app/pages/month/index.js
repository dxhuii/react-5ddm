import React, { PureComponent, Fragment } from 'react'
import { withRouter, Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { monthLoad } from '@/store/actions/month'
import { getMonth } from '@/store/reducers/month'

import Shell from '@/components/Shell'
import Meta from '@/components/Meta'

import Item from '@/components/List/Item'
import Loading from '@/components/Ui/Loading'

import './style.scss'

@Shell
@withRouter
@connect(
  (state, props) => ({
    info: getMonth(state, props.match.params.month)
  }),
  dispatch => ({
    monthLoad: bindActionCreators(monthLoad, dispatch)
  })
)
class Month extends PureComponent {
  static propTypes = {
    info: PropTypes.object,
    match: PropTypes.object,
    monthLoad: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = {
      nowYear: new Date().getFullYear(),
      year: parseInt(props.match.params.month.substring(0, 4))
    }
  }
  componentDidMount() {
    const {
      info,
      monthLoad,
      match: {
        params: { month }
      }
    } = this.props
    if (!info.data) {
      monthLoad({ month })
    }
  }

  year(start) {
    const d = new Date()
    const s = d.getFullYear() - start
    let y = []
    for (let i = 0; i <= s; i++) {
      y.push(start + i)
    }
    return y
  }

  month(year) {
    let m = []
    for (let i = 1; i <= 12; i++) {
      m.push(i <= 9 ? `${year}0${i}` : `${year}${i}`)
    }
    return m
  }

  onYear(year) {
    this.setState({
      year
    })
  }

  render() {
    const {
      info: { data = [], loading },
      match: {
        params: { month }
      }
    } = this.props
    const { year, nowYear } = this.state
    const m = month.substring(4)
    return (
      <Fragment>
        <Meta title={`${year}年${m}月播出的新番动漫_${m}月新番_动漫新番表_新番表`}>
          <meta name="keywords" content={`${year}年${m}月播出的新番动漫,${m}月新番,动漫新番表,${m}月最新动漫,${year}年${m}月的动漫,新番表`} />
          <meta
            name="description"
            content={`您想知道${year}年${m}月有哪些新番动漫播出吗，你想了解最新的动漫新番表 ，${m}月份最新动漫观看指南，${m}月播出的动漫资讯信息，请关注本站。`}
          />
        </Meta>
        {loading ? <Loading /> : null}
        <div className="wp mt20">
          <div className="box">
            <ul styleName="year" className="clearfix">
              {this.year(nowYear - 18).map(item => (
                <li key={item} styleName={year === item ? 'cur' : ''} onClick={() => this.onYear(item)}>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div styleName="month">
              {this.month(year).map(item => (
                <Link to={`/month/${item}`} key={item} styleName={month === item ? 'cur' : ''}>
                  {item}
                </Link>
              ))}
            </div>
          </div>
          <div className="box mt20">
            共 <b>{data.length}</b> 条
          </div>
          <Item data={data} />
        </div>
      </Fragment>
    )
  }
}

const Months = props => {
  const {
    match: {
      params: { month }
    }
  } = props
  return <Month {...props} key={month} />
}

Months.propTypes = {
  match: PropTypes.object
}

export default Months
