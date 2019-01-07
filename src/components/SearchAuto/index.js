import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { search } from '@/store/actions/search'
import { getSearch } from '@/store/reducers/search'

import './style.scss'

@connect(
  (state, props) => ({
    auto: getSearch(state, props.wd)
  }),
  dispatch => ({
    search: bindActionCreators(search, dispatch)
  })
)
class SearchAuto extends Component {
  static propTypes = {
    auto: PropTypes.object,
    wd: PropTypes.string,
    search: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = {
      wd: ''
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.wd === prevState.wd) {
      return null
    }
    const { wd, search } = nextProps
    search({ wd })
    return { wd }
  }

  highLightKeywords(data = []) {
    const { wd } = this.state
    // 正则匹配所有的文本
    const re = new RegExp(wd, 'g')
    for (let i = 0; i < data.length; i++) {
      const title = data[i].title
      if (re.test(data[i].title)) {
        data[i].title = title.replace(re, '<span class="highlight">$&</span>')
      }
    }
    return data
  }

  render() {
    const {
      auto: { data = [] }
    } = this.props
    return (
      <Fragment>
        {data.length > 0 ? (
          <ul styleName="search-auto">
            {this.highLightKeywords(data).map(item => (
              <li key={item.id}>
                <Link to={`/subject/${item.id}`}>
                  <span dangerouslySetInnerHTML={{ __html: item.title }} />
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </Fragment>
    )
  }
}

export default SearchAuto
