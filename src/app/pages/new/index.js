import React, { PureComponent, Fragment } from 'react'
import { withRouter, Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { TopList } from '@/store/actions/page'
import { getTopList } from '@/store/reducers/page'

import './style.scss'

import Shell from '@/components/Shell'
import Meta from '@/components/Meta'

@Shell
@withRouter
@connect(
  (state, props) => ({
    info: getTopList(state, 'addtime')
  }),
  dispatch => ({
    TopList: bindActionCreators(TopList, dispatch)
  })
)
class NewPage extends PureComponent {
  static propTypes = {
    info: PropTypes.object,
    TopList: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    const { info, TopList } = this.props
    if (!info.data) {
      TopList({ order: 'addtime' })
    }
  }

  getName(id) {
    let name = ''
    switch (id) {
      case 201:
        name = 'tv'
        break
      case 202:
        name = 'ova'
        break
      case 203:
        name = 'juchang'
        break
      case 4:
        name = 'tebie'
        break
      case 204:
        name = 'zhenren'
        break
      case 35:
        name = 'qita'
        break
      default:
        name = 'list'
        break
    }
    return name
  }

  render() {
    const {
      info: { data = [] }
    } = this.props
    return (
      <Fragment>
        <Meta title="最新更新的100个动漫" />
        <div className="wp mt20">
          <div className="box">
            <ul styleName="newlist">
              <li>
                <span>动漫标题</span>
                <span>动漫分类</span>
                <span>动漫类型</span>
                <span>更新时间</span>
              </li>
              {data.map(item => (
                <li key={item.id}>
                  <span>
                    <Link to={`/subject/${item.id}`}>{item.title}</Link> / <Link to={`/play/${item.id}/${item.pid}`}>{item.lastname}</Link>
                    {item.isDate ? <em>new</em> : null}
                  </span>
                  <span>
                    <Link to={`/type/${this.getName(item.listId)}/-/-/-/-/-/-/`}>{item.listName}</Link>
                  </span>
                  <span>
                    {(item.mcid || []).map(val => (
                      <Link to={`/type/${this.getName(item.listId)}/${val.id}/-/-/-/-/-/`} key={val.id}>
                        {val.title}
                      </Link>
                    ))}
                  </span>
                  <span styleName={item.isDate ? 'red' : ''}>{item.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default NewPage
