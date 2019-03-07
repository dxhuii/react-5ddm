import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { isNumber, formatPic } from '@/utils'

import '../out.scss'

export default class Item extends PureComponent {
  static defaultProps = {
    data: []
  }
  static propTypes = {
    data: PropTypes.array
  }
  render() {
    const { data } = this.props
    return (
      <ul styleName="week">
        {data.map(item => (
          <li key={item.id}>
            <a target="_blank" rel="noopener noreferrer" href={`https://www.dddm.tv/subject/${item.id}`} key={item.id}>
              <div><img src={formatPic(item.smallPic || item.pic, 'thumb150')} alt={item.title} /></div>
              <h4>{item.title}</h4>
            </a>
            {isNumber(item.status) ? (
              item.isDate ? (
                <p>
                  更新至
                  <a styleName="today" target="_blank" rel="noopener noreferrer" href={`https://www.dddm.tv/play/${item.id}/${item.pid}`}>
                    {item.status}话
                  </a>
                </p>
              ) : (
                <p>
                  更新至
                  <a target="_blank" rel="noopener noreferrer" href={`https://www.dddm.tv/play/${item.id}/${item.pid}`}>
                    {item.status}话
                  </a>
                </p>
              )
            ) : (
              <p styleName="no">
                {item.isDate ? (
                  <a styleName="today" target="_blank" rel="noopener noreferrer" href={`https://www.dddm.tv/play/${item.id}/${item.pid}`}>
                    {item.status}
                  </a>
                ) : (
                  <a target="_blank" rel="noopener noreferrer" href={`https://www.dddm.tv/play/${item.id}/${item.pid}`}>
                    {item.status}
                  </a>
                )}
              </p>
            )}
          </li>
        ))}
      </ul>
    )
  }
}
