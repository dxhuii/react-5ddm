import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { listLoad } from '../../actions/list'
import { getList } from '../../reducers/list'

import { picHttps } from '../../utils'

import CSSModules from 'react-css-modules'
import styles from './index.scss'

@withRouter
@connect(
  (state, props) => ({
    list: getList(state, props.stateId || '', props.id || '', props.mcid || '', props.year || '', props.area || '', props.letter || '', props.lz || '', props.day || '', props.order || '', props.limit || '')
  }),
  dispatch => ({
    listLoad: bindActionCreators(listLoad, dispatch)
  })
)
@CSSModules(styles, { allowMultiple: true })
export class List extends Component {
  constructor(props) {
    super(props)
    const { stateId, id, mcid, year, area, letter, lz, day, order, limit } = props
    this.state = {
      stateId, id, mcid, year, area, letter, lz, day, order, limit
    }
    this.load = this.load.bind(this)
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if(
      nextProps.id === prevState.id &&
      nextProps.year === prevState.year &&
      nextProps.mcid === prevState.mcid &&
      nextProps.letter === prevState.letter &&
      nextProps.lz === prevState.lz &&
      nextProps.order === prevState.order &&
      nextProps.area === prevState.area
    ) {
      return null;
    }
    const { stateId, id, mcid, year, area, letter, lz, day, order, limit, listLoad } = nextProps
    listLoad({ stateId, id, mcid, year, area, letter, lz, day, order, limit, more: true })
    return { id, mcid, year, area, letter, lz, order }
  }

  componentDidMount() {
    const { list, scrollLoad, stateId } = this.props
    if (!list.data) this.load();
    if (scrollLoad) ArriveFooter.add(stateId, this.load);
  }

  componentWillUnmount() {
    const { scrollLoad, stateId } = this.props
    if (scrollLoad) ArriveFooter.remove(stateId)
  }

  async load() {
    const { listLoad } = this.props
    const { stateId, id, mcid, year, area, letter, lz, day, order, limit } = this.state
    await listLoad({ stateId, id, mcid, year, area, letter, lz, day, order, limit })
  }

  render() {
    const { list: { data = [] }, loading } = this.props
    return(
      <div className="row" styleName='d-item'>
        {loading ? <div>loading</div> : null }
        {
          data.map(item =>
            <li key={item.id} className="col-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 mb-4">
              <Link to={`/bangumi/${item.id}`}>
                <div className="load-demand" data-load-demand={`<img src="${picHttps(item.pic)}" alt="${item.title}" />`} />
                <h3>{item.title}</h3>
              </Link>
              <Link to={`/bangumi/${item.id}/${item.pid}`}>{item.isDate ? <p style={{color:'#f60'}}>{item.status}</p> : <p>{item.status}</p>}</Link>
            </li>
        )}
      </div>
    )
  }
}

export default List
