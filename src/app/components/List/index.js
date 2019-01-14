import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { listLoad } from '@/store/actions/list'
import { getList } from '@/store/reducers/list'

import { isNumber, formatPic } from '@/utils'

import './style.scss'

@withRouter
@connect(
  (state, props) => ({
    list: getList(
      state,
      props.stateId || '',
      props.id || '',
      props.mcid || '',
      props.year || '',
      props.area || '',
      props.wd || '',
      props.letter || '',
      props.lz || '',
      props.day || '',
      props.order || '',
      props.limit || ''
    )
  }),
  dispatch => ({
    listLoad: bindActionCreators(listLoad, dispatch)
  })
)
class List extends Component {
  constructor(props) {
    super(props)
    const { stateId, id, mcid, year, area, wd, letter, lz, day, order, limit } = props
    this.state = {
      stateId,
      id,
      mcid,
      year,
      area,
      wd,
      letter,
      lz,
      day,
      order,
      limit
    }
    this.load = this.load.bind(this)
  }

  static propTypes = {
    stateId: PropTypes.any,
    id: PropTypes.any,
    mcid: PropTypes.any,
    year: PropTypes.any,
    area: PropTypes.string,
    wd: PropTypes.string,
    letter: PropTypes.string,
    lz: PropTypes.any,
    day: PropTypes.any,
    order: PropTypes.string,
    limit: PropTypes.any,
    list: PropTypes.object,
    listLoad: PropTypes.func,
    scrollLoad: PropTypes.bool,
    loading: PropTypes.bool
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.id === prevState.id &&
      nextProps.year === prevState.year &&
      nextProps.mcid === prevState.mcid &&
      nextProps.letter === prevState.letter &&
      nextProps.lz === prevState.lz &&
      nextProps.order === prevState.order &&
      nextProps.area === prevState.area
    ) {
      return null
    }
    const { id, mcid, year, area, wd, letter, lz, order } = nextProps
    return { id, mcid, year, area, wd, letter, lz, order }
  }

  componentDidMount() {
    const { list, scrollLoad, stateId } = this.props
    if (!list.data) this.load()
    if (scrollLoad) ArriveFooter.add(stateId, this.load)
  }

  componentWillUnmount() {
    const { scrollLoad, stateId } = this.props
    if (scrollLoad) ArriveFooter.remove(stateId)
  }

  async load() {
    const { listLoad } = this.props
    const { stateId, id, mcid, year, area, wd, letter, lz, day, order, limit } = this.state
    await listLoad({ stateId, id, mcid, year, area, wd, letter, lz, day, order, limit })
  }

  render() {
    const {
      list: { data = [], loading }
    } = this.props
    return (
      <div styleName="main-list">
        <div className="wp">
          <div styleName="d-item">
            {loading ? <div>loading</div> : null}
            {data.map(item => (
              <li key={item.id}>
                <Link to={`/subject/${item.id}`}>
                  <div className="load-demand" data-load-demand={`<img src="${formatPic(item.pic, 'orj360')}" alt="${item.title}" />`} />
                  <h3>{item.title}</h3>
                </Link>
                <Link to={`/play/${item.id}/${item.pid}`}>
                  {isNumber(item.status) ? (
                    item.isDate ? (
                      <p styleName="today">更新至{item.status}话</p>
                    ) : (
                      <p>更新至{item.status}话</p>
                    )
                  ) : item.isDate ? (
                    <p styleName="today">{item.status}</p>
                  ) : (
                    <p>{item.status}</p>
                  )}
                </Link>
              </li>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default List
