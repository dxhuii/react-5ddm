import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

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
            <Link key={item.id} to={`/subject/${item.id}`}>
              <div
                className="load-demand"
                data-load-demand={`<img src="${formatPic(item.smallPic || item.pic, 'thumb150')}" alt="${item.title}" />`}
              />
              <h4>{item.title}</h4>
            </Link>
            {isNumber(item.status) ? (
              item.isDate ? (
                <p>
                  更新至
                  <Link styleName="today" to={`/play/${item.id}/${item.pid}`}>
                    {item.status}话
                  </Link>
                </p>
              ) : (
                <p>
                  更新至<Link to={`/play/${item.id}/${item.pid}`}>{item.status}话</Link>
                </p>
              )
            ) : (
              <p styleName="no">
                {item.isDate ? (
                  <Link styleName={item.isDate ? 'today' : ''} to={`/play/${item.id}/${item.pid}`}>
                    {item.status}
                  </Link>
                ) : (
                  <Link to={`/play/${item.id}/${item.pid}`}>{item.status}</Link>
                )}
              </p>
            )}
          </li>
        ))}
      </ul>
    )
  }
}
