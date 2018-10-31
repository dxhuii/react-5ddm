import React, { Component } from 'react';

import List from '../../components/list'
import Shell from '../../components/shell';

import CSSModules from 'react-css-modules'
import styles from './index.scss';

@Shell
@CSSModules(styles, { allowMultiple: true })
export class BangumiList extends Component {
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

  render() {
    const { id, mcid, area, year, letter, lz, day, order, limit } = this.state
    const areaArr = ['全部', '大陆', '日本']
    const yearArr = ['全部', 2020, 2019, 2018, 2017, 2016, 2015]
    const letterArr = ['全部', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
    const mcidArr = [{name: '全部', id: -1}, {name: '热血', id: 59}, {name: '冒险', id: 60}]
    const idArr = [{name: '全部', id: -1}, {name: 'TV', id: 201}, {name: 'ova', id: '202'}]
    const lzArr = [{name: '全部', id: -1}, {name: '连载', id: 1}, {name: '完结', id: 2}]
    return(<>
      <div styleName='filter'>
        {(id || mcid || area || year || letter || lz) &&
          <ul>已选：
            <li onClick={() => this.getParams('id', '')}>{this.getName(idArr, id)}</li>
            <li onClick={() => this.getParams('mcid', '')}>{this.getName(mcidArr, mcid)}</li>
            <li onClick={() => this.getParams('lz', '')}>{this.getName(lzArr, lz)}</li>
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
        letter={letter}
        lz={lz}
        day={day}
        order={order}
        limit={limit}
        scrollLoad={true}
      />
    </>)
  }
}

export default BangumiList
