import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { listLoad } from '@/store/actions/list'
import { getList } from '@/store/reducers/list'

import Item from './Item'

import './style.scss'

function isEmpty(val, type) {
  return val === '' || val === '-' ? (type ? 'addtime' : '') : val
}

@withRouter
@connect(
  (state, props) => ({
    list: getList(
      state,
      props.id,
      isEmpty(props.mcid),
      isEmpty(props.year),
      isEmpty(props.area),
      isEmpty(props.wd),
      isEmpty(props.letter),
      isEmpty(props.lz),
      isEmpty(props.order, 1)
    )
  }),
  dispatch => ({
    listLoad: bindActionCreators(listLoad, dispatch)
  })
)
class List extends Component {
  constructor(props) {
    super(props)
    const { id, mcid, year, area, wd, letter, lz, order } = props
    this.state = {
      id,
      mcid,
      year,
      area,
      wd,
      letter,
      lz,
      order
    }
    this.load = this.load.bind(this)
  }

  static propTypes = {
    id: PropTypes.any,
    mcid: PropTypes.any,
    year: PropTypes.any,
    area: PropTypes.string,
    wd: PropTypes.string,
    letter: PropTypes.string,
    lz: PropTypes.any,
    order: PropTypes.string,
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
    const { list, scrollLoad, id } = this.props
    if (!list.data) this.load()
    if (scrollLoad) ArriveFooter.add(id, this.load)
  }

  componentWillUnmount() {
    const { scrollLoad, id } = this.props
    if (scrollLoad) ArriveFooter.remove(id)
  }

  async load() {
    const { listLoad } = this.props
    const { id, mcid, year, area, wd, letter, lz, order } = this.state
    await listLoad({ id, mcid, year, area, wd, letter, lz, order })
  }

  render() {
    const {
      list: { data = [], loading }
    } = this.props
    return (
      <div styleName="main-list">
        {loading ? <div>loading</div> : null}
        <div className="wp">
          <Item data={data} />
        </div>
      </div>
    )
  }
}

export default List
