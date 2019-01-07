import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'
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

  static defaultProps = {
    wd: ''
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

  render() {
    const {
      auto: { data = [] }
    } = this.props
    console.log(this.props, data, 'auto')
    return (
      <div styleName="search-auto">
        {data.map(item => (
          <Link key={item.id} to={`/subject/${item.id}`}>
            {item.title}
          </Link>
        ))}
      </div>
    )
  }
}

export default SearchAuto
