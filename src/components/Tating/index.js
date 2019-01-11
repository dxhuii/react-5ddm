import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import './style.scss'

class Tating extends Component {
  static propTypes = {
    data: PropTypes.object
  }

  static defaultProps = {
    data: {}
  }

  constructor(props) {
    super(props)
    this.state = {
      starWith: 0,
      star: 0,
      starText: ['很差', '较差', '还行', '推荐', '力荐']
    }
  }

  onStar(index) {
    this.setState({
      starWith: index * 16,
      star: index
    })
  }

  starClass(pfnum) {
    var pfclass = ''
    if (pfnum >= 50) {
      pfclass = 'bigstar50'
    } else if (pfnum >= 45) {
      pfclass = 'bigstar45'
    } else if (pfnum >= 40) {
      pfclass = 'bigstar40'
    } else if (pfnum >= 35) {
      pfclass = 'bigstar35'
    } else if (pfnum >= 30) {
      pfclass = 'bigstar30'
    } else if (pfnum >= 35) {
      pfclass = 'bigstar35'
    } else if (pfnum >= 20) {
      pfclass = 'bigstar20'
    } else if (pfnum >= 15) {
      pfclass = 'bigstar15'
    } else if (pfnum >= 10) {
      pfclass = 'bigstar10'
    } else if (pfnum >= 5) {
      pfclass = 'bigstar5'
    } else if (pfnum >= 0) {
      pfclass = 'bigstar0'
    }
    return pfclass
  }

  show(data, text) {
    const { a, b, c, d, e, pinfen, pinfenb } = data
    const total = a + b + c + d + e
    const calc = val => `${((val / total) * 100).toFixed(2)}%`
    const progressBar = val => <div styleName="progress-bar" style={{ width: calc(val) }} />
    const scoreArr = [a, b, c, d, e]
    return (
      <Fragment>
        {pinfenb > 0 && total > 0 ? (
          <div styleName="rating" className="pr">
            <h4>评分</h4>
            <div styleName="rating-num">
              <strong>{pinfen}</strong>
              <span className="bigstar45" />
              <span styleName="people">
                <em>{total}</em>人评价
              </span>
            </div>
            <ul styleName="rating-show" className="clearfix">
              {scoreArr.map((item, index) => (
                <li key={index}>
                  <span>{text[scoreArr.length - (index + 1)]}</span>
                  <div styleName="progress" title={calc(item)}>
                    {progressBar(item)}
                  </div>
                  <em>{item}人</em>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div styleName="noscore">还没有评分</div>
        )}
      </Fragment>
    )
  }

  move(index) {
    this.setState({
      star: index
    })
  }

  render() {
    const { starWith, starText, star } = this.state
    const { data } = this.props
    return (
      <Fragment>
        {this.show(data, starText)}
        <div styleName="starBox">
          <em>评分</em>
          <div styleName="starlist">
            {[1, 2, 3, 4, 5].map(item => (
              <a
                key={item}
                title={`${item}星`}
                styleName={`star_${item}`}
                onClick={() => this.onStar(item)}
                onMouseOver={() => this.move(item)}
              />
            ))}
          </div>
          <div styleName="star_current" style={{ width: starWith }} />
          <span>{starText[star - 1]}</span>
        </div>
      </Fragment>
    )
  }
}

export default Tating
