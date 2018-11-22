import React, { Component, Fragment } from 'react'

import { withRouter, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { search } from '../../actions/search'
import { getSearchState } from '../../reducers/search'

import Shell from '../../components/shell'
import Meta from '../../components/meta'

@withRouter
@connect(
  (state, props) => ({
    info: getSearchState(state, props.location.search.split('=')[1].split('&')[0])
  }),
  dispatch => ({
    search: bindActionCreators(search, dispatch)
  })
)
@Shell
export class Search extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount(){
    console.log(this.props.location)
    const { location: { params: { keyword } }, info, search} = this.props

    if (!info || !info.data) {
      search({ q: keyword })
    }
  }

  render() {
    const { info: { data = [] }, location: { params: { cn } } } = this.props
    console.log(data)

    return(<Fragment>
      <Meta title="Search" />
      <h2>{decodeURIComponent(cn)}</h2>
      {data.map(item => <div key={item.id}><Link to={`/subject/${item.id}`}>{item.name}</Link></div>)}
    </Fragment>)
  }

}

export default Search
