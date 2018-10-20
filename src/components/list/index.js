import React from 'react'

import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { listLoad } from '../../actions/list'
import { getList } from '../../reducers/list'

@withRouter
@connect(
  (state, props) => ({
    list: getList(state, 'list')
  }),
  dispatch => ({
    listLoad: bindActionCreators(listLoad, dispatch)
  })
)
export class List extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      limit: 20,
      order: 'addtime',
      day: 365
    }
    this.load = this.load.bind(this)
  }

  componentDidMount() {
    const { list, scrollLoad } = this.props
    if (!list.data) this.load();
    if (scrollLoad) ArriveFooter.add('list', this.load);
  }

  componentWillUnmount() {
    const { scrollLoad } = this.props;
    if (scrollLoad) ArriveFooter.remove('list');
  }

  async load() {
    const { listLoad } = this.props
    const { limit, order, day } = this.state
    await listLoad({ id: 'list', limit, order, day })
  }

  render() {
    const { list: { data = [], loading } } = this.props
    // console.log(data, loading, 'listlist')
    return(
      <div className="card">
        <h5 className="card-header">listlist</h5>
        {
          data.map(item => <div key={item.id} style={{height: 100}}>{item.title}</div>)
        }
      </div>
    )
  }
}

export default List
