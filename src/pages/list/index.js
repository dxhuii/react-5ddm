import React, { Component, Fragment } from 'react';

import List from '../../components/List'
import Shell from '../../components/Shell'
import Meta from '../../components/Meta'

import './style.scss';

@Shell
export class SubjectList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lz: '',
      mcid: '',
      area: '',
      year: '',
      letter: '',
      limit: 30,
      order: 'addtime',
      day: 365,
      id: 3
    }
  }

  getName(data, id){
    for (let i of data) {
      if(i.id === id){
        return i.name
      }
    }
  }

  getParams(type, value){
    this.setState({
      [type]: value === '全部' ? '' : value
    })
  }

  isSearch(){
    const { location: { pathname }, match: { params: { wd = '' }}, location: { params: { cn = '' } } } = this.props
    const isSearch = pathname.indexOf('search') !== -1
    return {
      wd,
      cn,
      isSearch
    }
  }

  render() {
    const { id, mcid, area, year, letter, lz, day, order, limit } = this.state
    const { wd, cn, isSearch } = this.isSearch()
    const areaArr = ['全部', '大陆', '日本']
    const yearArr = ['全部', 2020, 2019, 2018, 2017, 2016, 2015]
    const letterArr = ['全部', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
    const mcidArr = [{name: '全部', id: -1}, {name: '热血', id: 59}, {name: '冒险', id: 60}]
    const idArr = [{name: '全部', id: -1}, {name: 'TV', id: 201}, {name: 'ova', id: '202'}]
    const lzArr = [{name: '全部', id: -1}, {name: '连载', id: 1}, {name: '完结', id: 2}]
    const typeName = this.getName(idArr, id)
    const mcidName = this.getName(mcidArr, mcid)
    const lzName = this.getName(lzArr, lz)
    const keyword = decodeURIComponent(cn)
    return(
    <Fragment>
      {isSearch ? <h2>{keyword}</h2> : null}
      <Meta title={isSearch ? `你搜索的是${keyword}` : `动漫列表`} />
      <div styleName='filter'>
        {(id || mcid || area || year || letter || lz) &&
          <ul>已选：
            {typeName ? <li onClick={() => this.getParams('id', '')}>{typeName}</li> : null}
            {mcidName ? <li onClick={() => this.getParams('mcid', '')}>{mcidName}</li> : null}
            {lzName ? <li onClick={() => this.getParams('lz', '')}>{lzName}</li> : null}
            {area ? <li onClick={() => this.getParams('area', '')}>{area}</li> : null}
            {year ? <li onClick={() => this.getParams('year', '')}>{year}</li> : null}
            {letter ? <li onClick={() => this.getParams('letter', '')}>{letter}</li> : null}
          </ul>
        }
        <ul>
          {idArr.map(item => <li styleName={id === item.id ? 'cur' : ''} onClick={() => this.getParams('id', item.id)} key={item.id}>{item.name}</li>)}
        </ul>
        <ul>
          {mcidArr.map(item => <li styleName={mcid === item.id ? 'cur' : ''} onClick={() => this.getParams('mcid', item.id)} key={item.id}>{item.name}</li>)}
        </ul>
        <ul>
          {lzArr.map(item => <li styleName={lz === item.id ? 'cur' : ''} onClick={() => this.getParams('lz', item.id)} key={item.id}>{item.name}</li>)}
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
      <List
        stateId="list"
        id={id}
        mcid={mcid}
        year={year}
        area={area}
        wd={wd || ''}
        letter={letter}
        lz={lz}
        day={day}
        order={order}
        limit={limit}
        scrollLoad={true}
      />
    </Fragment>)
  }
}

export default SubjectList
