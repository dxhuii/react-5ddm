import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { listLoad } from '@/store/actions/list'
import { configLoad } from '@/store/actions/config'
import { getConfig } from '@/store/reducers/config'
import { getList } from '@/store/reducers/list'

import Shell from '@/components/Shell'
import Meta from '@/components/Meta'
import Loading from '@/components/Ui/Loading'

import Item from '@/components/List/Item'
import Ads from '@/components/Ads'
import { isMobile } from '@/utils'

import './style.scss'

function isEmpty(val, type) {
  return val === undefined || val === '' || val === '-' ? (type ? 'addtime' : '') : val
}

@Shell
@withRouter
@connect(
  (state, props) => ({
    config: getConfig(state, 'list'),
    list: getList(
      state,
      props.match.params.id || 3,
      isEmpty(props.match.params.mcid),
      isEmpty(props.match.params.year),
      isEmpty(props.match.params.area),
      isEmpty(props.match.params.wd),
      isEmpty(props.match.params.letter),
      isEmpty(props.match.params.lz),
      isEmpty(props.match.params.order, 1)
    )
  }),
  dispatch => ({
    configLoad: bindActionCreators(configLoad, dispatch),
    listLoad: bindActionCreators(listLoad, dispatch)
  })
)
class SubjectList extends Component {
  constructor(props) {
    super(props)
    const {
      match: {
        params: { id = 3, name, mcid, area, year, letter, lz, wd = '', order = 'addtime' },
        url
      }
    } = props
    let params = {}
    if (name) {
      const id = this.getTypeId(name)
      const type = name
      params = Object.assign(
        {},
        url.indexOf('type/') === -1
          ? { id, type }
          : {
              id,
              type,
              mcid,
              area,
              year,
              letter,
              lz,
              order
            },
        {}
      )
    } else {
      params = {
        id,
        wd
      }
    }
    this.state = Object.assign({}, params, {
      data: []
    })
    this.load = this.load.bind(this)
  }

  static propTypes = {
    location: PropTypes.object,
    match: PropTypes.object,
    configLoad: PropTypes.func,
    listLoad: PropTypes.func,
    config: PropTypes.object,
    history: PropTypes.object,
    list: PropTypes.object
  }

  componentDidMount() {
    const {
      config,
      configLoad,
      match: {
        params: { id }
      }
    } = this.props
    if (!config.data) {
      configLoad({ name: 'list' })
    }
    this.load()
    ArriveFooter.add(id, this.load)
  }

  componentWillUnmount() {
    const {
      match: {
        params: { id }
      }
    } = this.props
    ArriveFooter.remove(id)
  }

  async load() {
    const { listLoad } = this.props
    const { id, mcid, year, area, wd = '', letter, lz, order } = this.state
    const reMcid = isEmpty(mcid)
    const reYear = isEmpty(year)
    const reArea = isEmpty(area)
    const reLetter = isEmpty(letter)
    const reLz = isEmpty(lz)
    const reOrder = isEmpty(order, 1)
    let [, data] = await listLoad({ id, mcid: reMcid, year: reYear, area: reArea, wd, letter: reLetter, lz: reLz, order: reOrder })
    if (data) {
      this.setState({
        data: data.data
      })
    }
  }

  getTypeId(name) {
    let id
    switch (name) {
      case 'tv':
        id = 201
        break
      case 'ova':
        id = 202
        break
      case 'juchang':
        id = 203
        break
      case 'tebie':
        id = 4
        break
      case 'zhenren':
        id = 204
        break
      case 'qita':
        id = 35
        break
      default:
        id = 3
        break
    }
    return id
  }

  getName(data, id) {
    for (let i of data) {
      if (i.id === id) {
        return i.title
      }
    }
  }

  getParams(type, value, title) {
    const {
      match: { url }
    } = this.props
    this.setState(
      Object.assign({}, type === 'type' ? { id: this.getTypeId(value) } : {}, {
        [type]: value === '全部' ? '' : value,
        [`${type}Name`]: title === '全部' ? '' : title || ''
      }),
      () => {
        if (url.indexOf('type/') !== -1) {
          const { type, mcid, area, year, letter, lz, order } = this.state
          const path = `/type/${type || '-'}/${mcid || '-'}/${area || '-'}/${year || '-'}/${letter || '-'}/${lz || '-'}/${order}/`
          history.pushState(null, null, path)
        }
        this.load()
      }
    )
  }

  formatArray(data = []) {
    let f = [{ title: '全部', id: '' }]
    for (let i of data) {
      f.push({ title: i, id: i })
    }
    return f
  }

  isSearch() {
    const {
      location: { pathname },
      match: {
        params: { wd = '' }
      }
    } = this.props
    const isSearch = pathname.indexOf('search') !== -1
    return {
      wd,
      isSearch
    }
  }

  render() {
    const {
      list: { loading },
      config
    } = this.props
    const conf = config.data || {}
    const { data, type, mcid, area, year, letter, lz, order, typeName, mcidName, areaName, yearName, letterName, lzName } = this.state
    const { wd = '', isSearch } = this.isSearch()
    const idArr = [{ title: '全部', name: '' }].concat((conf.menu || {}).son || [])
    const mcidArr = [{ title: '全部', id: '' }].concat(conf.mcid || [])
    const areaArr = this.formatArray(conf.area)
    const yearArr = this.formatArray(conf.year)
    const letterArr = this.formatArray(conf.letter)
    // const lzArr = [{ title: '全部', id: '' }, { title: '连载', id: 1 }, { title: '完结', id: 2 }]
    const orderArr = [{ title: '最新', id: 'addtime' }, { title: '评分', id: 'gold' }, { title: '热门', id: 'hits' }]
    const keyword = decodeURIComponent(wd)
    return (
      <Fragment>
        {loading ? <Loading /> : null}
        <Meta
          title={
            isSearch
              ? `你搜索的是《${keyword}》`
              : `动漫列表${typeName ? `_${typeName}动漫_${typeName}动漫排行榜` : ''}${mcidName ? `_${mcidName}动漫_好看的${mcidName}动漫_最新${mcidName}动画片大全_${mcidName}动漫排行榜` : ''}${
                  areaName ? `_${areaName}${typeName}大全_${areaName}${typeName}排行榜` : ''
                }${yearName ? `_${yearName}的动漫` : ''}${letterName ? `_字母${letterName}开头的动漫` : ''}`
          }
        />
        <div styleName="filter">
          <div className="wp clearfix">
            {(type || mcid || area || year || letter || lz) && (
              <dl>
                <dt>已选</dt>
                <dd>
                  {typeName ? <a onClick={() => this.getParams('type', '')}>{typeName}</a> : null}
                  {mcidName ? <a onClick={() => this.getParams('mcid', '')}>{mcidName}</a> : null}
                  {/* {lzName ? <a onClick={() => this.getParams('lz', '')}>{lzName}</a> : null} */}
                  {areaName ? <a onClick={() => this.getParams('area', '')}>{areaName}</a> : null}
                  {yearName ? <a onClick={() => this.getParams('year', '')}>{yearName}</a> : null}
                  {letterName ? <a onClick={() => this.getParams('letter', '')}>{letterName}</a> : null}
                </dd>
              </dl>
            )}
            <dl className="clearfix">
              <dt>分类</dt>
              <dd>
                {idArr.map(item => (
                  <a styleName={type === item.name ? 'cur' : ''} onClick={() => this.getParams('type', item.name, item.title)} key={item.name} href="javascript:;">
                    {item.title}
                  </a>
                ))}
              </dd>
            </dl>
            <dl className="clearfix">
              <dt>类型</dt>
              <dd>
                {mcidArr.map(item => (
                  <a styleName={mcid === item.id ? 'cur' : ''} onClick={() => this.getParams('mcid', item.id, item.title)} key={item.id} href="javascript:;">
                    {item.title}
                  </a>
                ))}
              </dd>
            </dl>
            {/* <dl className="clearfix">
              <dt>连载</dt>
              <dd>
                {lzArr.map(item => (
                  <a
                    styleName={lz === item.id ? 'cur' : ''}
                    onClick={() => this.getParams('lz', item.id, item.title)}
                    key={item.id}
                    href="javascript:;"
                  >
                    {item.title}
                  </a>
                ))}
              </dd>
            </dl> */}
            <dl className="clearfix">
              <dt>地区</dt>
              <dd>
                {areaArr.map(item => (
                  <a styleName={area === item.id ? 'cur' : ''} onClick={() => this.getParams('area', item.id, item.title)} key={item.id} href="javascript:;">
                    {item.title}
                  </a>
                ))}
              </dd>
            </dl>
            <dl className="clearfix">
              <dt>年份</dt>
              <dd>
                {yearArr.map(item => (
                  <a styleName={year === item.id ? 'cur' : ''} onClick={() => this.getParams('year', item.id, item.title)} key={item.id} href="javascript:;">
                    {item.title}
                  </a>
                ))}
              </dd>
            </dl>
            <dl className="clearfix">
              <dt>字母</dt>
              <dd>
                {letterArr.map(item => (
                  <a styleName={letter === item.id ? 'cur' : ''} onClick={() => this.getParams('letter', item.id, item.title)} key={item.id} href="javascript:;">
                    {item.title}
                  </a>
                ))}
              </dd>
            </dl>
            <dl className="clearfix">
              <dt>排序</dt>
              <dd>
                {orderArr.map(item => (
                  <a styleName={order === item.id ? 'cur' : ''} onClick={() => this.getParams('order', item.id, item.title)} key={item.id} href="javascript:;">
                    {item.title}
                  </a>
                ))}
                {isSearch ? (
                  <span>
                    你搜索的是：<b>{keyword}</b>
                  </span>
                ) : null}
              </dd>
            </dl>
          </div>
        </div>
        {isMobile() ? (
          <div className="mt20">
            <Ads id={42} />
          </div>
        ) : (
          <div className="wp mt20">
            <Ads id={39} />
          </div>
        )}
        <div className="wp">
          <Item data={data} />
        </div>
      </Fragment>
    )
  }
}

export default SubjectList
