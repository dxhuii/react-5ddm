import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Share from '@/components/Share'

import './style.scss'

export default class TagShare extends PureComponent {
  static defaultProps = {
    tag: []
  }
  static propTypes = {
    tag: PropTypes.array,
    config: PropTypes.object
  }
  render() {
    const { tag, config } = this.props
    return (
      <div styleName="article-tool">
        <div styleName="article-tool__tag">
          {tag.map(item => (
            <Link to={`/search/${item}`} key={item}>
              #{item}
            </Link>
          ))}
        </div>
        <div styleName="article-tool__share">
          <Share data={config} />
        </div>
      </div>
    )
  }
}
