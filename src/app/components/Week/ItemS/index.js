import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { isNumber, formatPic } from '@/utils'

import './style.scss'

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
      <ul styleName="weeks">
        {data.map(item => (
          <li key={item.id}>
            <Link key={item.id} to={`/subject/${item.id}`}>
              <div
                className="load-demand"
                data-load-demand={`<img src="${formatPic(item.smallPic || item.pic, 'thumb150')}" alt="${item.title}" />`}
              />
              <h4>{item.title}</h4>
            </Link>
            <p styleName={item.isDate ? 'today' : ''}>
              {isNumber(item.status) ? (
                <Link to={`/play/${item.id}/${item.pid}`}>第{item.status}话</Link>
              ) : (
                <Link to={`/play/${item.id}/${item.pid}`}>{item.status}</Link>
              )}
            </p>
          </li>
        ))}
      </ul>
    )
  }
}
