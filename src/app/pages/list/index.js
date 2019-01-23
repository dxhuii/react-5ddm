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

import Item from '@/components/List/Item'

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
        params: { id = 3, name, mcid, area, year, letter, lz, order = 'addtime' },
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
        id
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
    if (data.data) {
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
        [`${type}Name`]: title || ''
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
    const { data, type, mcid, area, year, letter, lz, order, idName, mcidName, areaName, yearName, letterName, lzName } = this.state
    const { wd = '', isSearch } = this.isSearch()
    const idArr = [{ title: '全部', name: '' }].concat((conf.menu || {}).son || [])
    const mcidArr = [{ title: '全部', id: '' }].concat(conf.mcid || [])
    const areaArr = this.formatArray(conf.area)
    const yearArr = this.formatArray(conf.year)
    const letterArr = this.formatArray(conf.letter)
    const lzArr = [{ title: '全部', id: '' }, { title: '连载', id: 1 }, { title: '完结', id: 2 }]
    const orderArr = [{ title: '最新', id: 'addtime' }, { title: '评分', id: 'gold' }, { title: '热门', id: 'hits' }]
    const keyword = decodeURIComponent(wd)
    return (
      <Fragment>
        {isSearch ? <h2>{keyword}</h2> : null}
        <Meta title={isSearch ? `你搜索的是${keyword}` : '动漫列表'} />
        <div styleName="filter">
          <div className="wp">
            {(type || mcid || area || year || letter || lz) && (
              <ul>
                已选：
                {idName ? <li onClick={() => this.getParams('type', '')}>{idName}</li> : null}
                {mcidName ? <li onClick={() => this.getParams('mcid', '')}>{mcidName}</li> : null}
                {lzName ? <li onClick={() => this.getParams('lz', '')}>{lzName}</li> : null}
                {areaName ? <li onClick={() => this.getParams('area', '')}>{areaName}</li> : null}
                {yearName ? <li onClick={() => this.getParams('year', '')}>{yearName}</li> : null}
                {letterName ? <li onClick={() => this.getParams('letter', '')}>{letterName}</li> : null}
              </ul>
            )}
            <ul>
              {idArr.map(item => (
                <li
                  styleName={type === item.name ? 'cur' : ''}
                  onClick={() => this.getParams('type', item.name, item.title)}
                  key={item.name}
                >
                  {item.title}
                </li>
              ))}
            </ul>
            <ul>
              {mcidArr.map(item => (
                <li styleName={+mcid === item.id ? 'cur' : ''} onClick={() => this.getParams('mcid', item.id, item.title)} key={item.id}>
                  {item.title}
                </li>
              ))}
            </ul>
            <ul>
              {lzArr.map(item => (
                <li styleName={lz === item.id ? 'cur' : ''} onClick={() => this.getParams('lz', item.id, item.title)} key={item.id}>
                  {item.title}
                </li>
              ))}
            </ul>
            <ul>
              {areaArr.map(item => (
                <li styleName={area === item.id ? 'cur' : ''} onClick={() => this.getParams('area', item.id, item.title)} key={item.id}>
                  {item.title}
                </li>
              ))}
            </ul>
            <ul>
              {yearArr.map(item => (
                <li styleName={year === item.id ? 'cur' : ''} onClick={() => this.getParams('year', item.id, item.title)} key={item.id}>
                  {item.title}
                </li>
              ))}
            </ul>
            <ul>
              {letterArr.map(item => (
                <li styleName={letter === item.id ? 'cur' : ''} onClick={() => this.getParams('letter', item.id, item.title)} key={item.id}>
                  {item.title}
                </li>
              ))}
            </ul>
            <ul>
              {orderArr.map(item => (
                <li styleName={order === item.id ? 'cur' : ''} onClick={() => this.getParams('order', item.id, item.title)} key={item.id}>
                  {item.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="wp">
          <Item data={data} />
        </div>
      </Fragment>
    )
  }
}

export default SubjectList
