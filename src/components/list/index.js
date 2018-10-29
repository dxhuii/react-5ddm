import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { listLoad } from '../../actions/list'
import { getList } from '../../reducers/list'

import CSSModules from 'react-css-modules'
import styles from './index.scss';

@withRouter
@connect(
  (state, props) => ({
    list: getList(state, props.key)
  }),
  dispatch => ({
    listLoad: bindActionCreators(listLoad, dispatch)
  })
)
@CSSModules(styles, { allowMultiple: true })
export class List extends Component {

  constructor(props) {
    super(props)
    this.state = {
      limit: 20,
      order: 'addtime',
      day: 365
    }
    this.load = this.load.bind(this)
  }

  componentDidMount() {
    const { list, scrollLoad, key } = this.props
    if (!list.data) this.load();
    if (scrollLoad) ArriveFooter.add(key, this.load);
  }

  componentWillUnmount() {
    const { scrollLoad, key } = this.props;
    if (scrollLoad) ArriveFooter.remove(key);
  }

  async load() {
    const { listLoad } = this.props
    const { limit, order, day } = this.state
    await listLoad({ id: 'list', limit, order, day })
  }

  picHttps(pic){
    return pic.replace('http://', '//').replace('https://', '//');
  }

  render() {
    const { list: { data = [], loading } } = this.props
    return(
      <div className="row" styleName='d-item'>
        {loading ? <div>loading</div> : null }
        {
          data.map(item =>
            <li key={item.id} className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-4">
              <Link to={`/bangumi/${item.id}`}>
                <div><img src={this.picHttps(item.pic)} alt={item.title} /></div>
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
