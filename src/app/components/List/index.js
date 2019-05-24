import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { listLoad } from '@/store/actions/list'
import { getList } from '@/store/reducers/list'

import Item from './Item'
import Loading from '@/components/Ui/Loading'

import './style.scss'

function isEmpty(val, type) {
  return val === undefined || val === '' || val === '-' ? (type ? 'addtime' : '') : val
}

@connect(
  (state, props) => ({
    list: getList(state, props.id, isEmpty(props.mcid), isEmpty(props.year), isEmpty(props.area), isEmpty(props.wd), isEmpty(props.letter), isEmpty(props.lz), isEmpty(props.order, 1))
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
    const { id, mcid, year, area, wd = '', letter, lz, order } = this.state
    const reMcid = isEmpty(mcid)
    const reYear = isEmpty(year)
    const reArea = isEmpty(area)
    const reLetter = isEmpty(letter)
    const reLz = isEmpty(lz)
    const reOrder = isEmpty(order, 1)
    await listLoad({ id, mcid: reMcid, year: reYear, area: reArea, wd, letter: reLetter, lz: reLz, order: reOrder })
  }

  render() {
    const {
      list: { data = [], loading }
    } = this.props
    if (loading) return <Loading />
    return (
      <div styleName="main-list">
        <div className="wp">
          <Item data={data} />
        </div>
      </div>
    )
  }
}

export default List
