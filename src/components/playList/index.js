import React, { Component } from 'react'

import { withRouter, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { playlist } from '../../actions/playlist'
import { getPlayList } from '../../reducers/playlist'

@withRouter
@connect(
  (state, props) => ({
    play: getPlayList(state, props.match.params.id)
  }),
  dispatch => ({
    playlist: bindActionCreators(playlist, dispatch)
  })
)
export class PlayList extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {

    const { id } = this.props.match.params;
    const { play, playlist } = this.props
    if (!play || !play.data) {
      playlist({ id })
    }

  }

  render() {
    const { play: { data = {}, loading }, match } = this.props
    const list = (data.Data || {}).playurls || []
    const { id, pid } = match.params
    return(
      <div className="card">
        <h5 className="card-header">播放列表</h5>
        <div className="card-body">
        { loading ? <div>loading...</div> : null }
        <ul>
          {list.map(item => <li key={item[1]}>{pid === item[1].toString() ? <Link style={{color: 'red'}} to={`/play/${id}/${item[1]}`}>{item[0]}</Link> : <Link to={`/play/${id}/${item[1]}`}>{item[0]}</Link>}</li>)}
        </ul>
        </div>
      </div>
    )
  }
}

export default PlayList;
