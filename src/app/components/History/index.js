import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { playlog, delplaylog, emptyhistory } from '@/store/actions/history'
import { getplaylog } from '@/store/reducers/history'

import './style.scss'

@withRouter
@connect(
  (state, props) => ({
    data: getplaylog(state, props.userid || 0)
  }),
  dispatch => ({
    playlog: bindActionCreators(playlog, dispatch),
    delplaylog: bindActionCreators(delplaylog, dispatch),
    emptyhistory: bindActionCreators(emptyhistory, dispatch)
  })
)
class History extends Component {
  static propTypes = {
    playlog: PropTypes.func,
    delplaylog: PropTypes.func,
    emptyhistory: PropTypes.func,
    data: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object,
    userid: PropTypes.any,
    isShow: PropTypes.bool
  }

  constructor(props) {
    super(props)
    this.state = {
      historyList: []
    }
  }

  componentDidMount() {
    this.showHistory()
  }

  async showHistory() {
    const { userid, playlog, data } = this.props
    let historyList = []
    let count = 0
    if (userid) {
      if (!data.data) {
        let [, data] = await playlog({ uid: userid })
        if (data) {
          historyList = data.data
        }
      } else {
        const {
          data: { data = [] }
        } = this.props
        historyList = data
      }
    } else {
      historyList = JSON.parse(localStorage.historyData || '[]')
      for (let i = 0; i < historyList.length; i++) {
        historyList[i] = JSON.parse(historyList[i])
      }
    }
    this.setState({ historyList })
  }
  // 删除记录
  delplaylog(id) {
    const { userid, delplaylog } = this.props
    if (userid) {
      delplaylog({ id, uid: userid })
    } else {
      const historyData = JSON.parse(localStorage.historyData || '[]')
      historyData.splice(id, 1)
      localStorage.historyData = JSON.stringify(historyData)
    }
    this.showHistory()
  }
  // 清空记录
  emptyhistory = () => {
    const { userid, emptyhistory } = this.props
    if (userid) {
      emptyhistory({ uid: userid })
    } else {
      localStorage.historyData = ''
    }
    this.showHistory()
  }

  render() {
    const { historyList } = this.state
    const { userid, isShow } = this.props
    // console.log(historyList)
    return (
      <div styleName="history" className="box" style={{ display: isShow ? 'block' : 'none' }}>
        <div styleName="title">
          <h2>观看记录</h2>
          <span onClick={this.emptyhistory}>清空记录</span>
        </div>
        <ul styleName="list">
          {historyList.map((item, index) => (
            <li key={index}>
              <span>
                <Link to={`/subject/${item.vid}`}>{item.title}</Link>
                <Link to={`/subject/${item.vid}/${item.pid}`}>{item.name}</Link>
              </span>
              <Link to={`/play/${item.vid}/${item.pid}`}>续播</Link>
              {item.next ? <Link to={`/play/${item.vid}/${item.next}`}>下一集</Link> : null}
              <a onClick={() => this.delplaylog(userid ? item.id : index)}>删除</a>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

const Historys = props => {
  const { pid } = props
  return <History {...props} key={pid} />
}

Historys.propTypes = {
  pid: PropTypes.any
}

export default Historys
