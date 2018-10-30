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
    list: getList(state, 3)
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
      limit: 3,
      order: 'addtime',
      day: 365,
      id: 3,
      mcid: '',
      area: '',
      year: '',
      letter: ''
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
    const { id, limit, order, day, mcid, area, year, letter } = this.state
    await listLoad({ id, limit, order, day, mcid, area, year, letter })
  }

  picHttps(pic){
    return pic.replace('http://', '//').replace('https://', '//');
  }

  getName(data, id){
    for(let i of data){
      if(i.id === id){
        return i.name
      }
    }
  }

  getParams(type, value){
    this.setState({
      [type]: value
    }, () => this.load())
  }

  render() {
    const { list: { data = [], loading } } = this.props
    const { id, mcid, area, year, letter } = this.state
    console.log(this.props)
    const areaArr = ['全部', '大陆', '日本']
    const yearArr = ['全部', 2020, 2019, 2018, 2017, 2016, 2015]
    const letterArr = ['全部', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
    const mcidArr = [{name: '全部', id: -1}, {name: '热血', id: 59}, {name: '冒险', id: 60}]
    const idArr = [{name: '全部', id: -1}, {name: 'TV', id: 201}, {name: 'ova', id: '202'}]
    return(
      <>
      <div styleName='filter'>
        {(id || mcid || area || year || letter) &&
          <ul>已选：
            <li onClick={() => this.getParams('id', '')}>{this.getName(idArr, id)}</li>
            <li onClick={() => this.getParams('mcid', '')}>{this.getName(mcidArr, mcid)}</li>
            <li onClick={() => this.getParams('area', '')}>{area}</li>
            <li onClick={() => this.getParams('year', '')}>{year}</li>
            <li onClick={() => this.getParams('letter', '')}>{letter}</li>
          </ul>
        }
        <ul>
          {idArr.map(item => <li styleName={id === item.id ? 'cur' : ''} onClick={() => this.getParams('id', item.id)} key={item.id}>{item.name}</li>)}
        </ul>
        <ul>
          {mcidArr.map(item => <li styleName={mcid === item.id ? 'cur' : ''} onClick={() => this.getParams('mcid', item.id)} key={item.id}>{item.name}</li>)}
        </ul>
        <ul>
          {areaArr.map(item => <li styleName={area === item ? 'cur' : ''} onClick={() => this.getParams('area', item)} key={item}>{item}</li>)}
        </ul>
        <ul>
          {yearArr.map(item => <li styleName={year === item ? 'cur' : ''} onClick={() => this.getParams('year', item)} key={item}>{item}</li>)}
        </ul>
        <ul>
          {letterArr.map(item => <li styleName={letter === item ? 'cur' : ''} onClick={() => this.getParams('letter', item)} key={item}>{item}</li>)}
        </ul>
      </div>
      <div className="row mt-4" styleName='d-item'>
        {loading ? <div>loading</div> : null }
        {
          data.map(item =>
            <li key={item.id} className="col-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 mb-4">
              <Link to={`/bangumi/${item.id}`}>
                {/* <div><img src={this.picHttps(item.pic)} alt={item.title} /></div> */}
                <h3>{item.title}</h3>
              </Link>
              <Link to={`/bangumi/${item.id}/${item.pid}`}>{item.isDate ? <p style={{color:'#f60'}}>{item.status}</p> : <p>{item.status}</p>}</Link>
            </li>
        )}
      </div>
      </>
    )
  }
}

export default List
