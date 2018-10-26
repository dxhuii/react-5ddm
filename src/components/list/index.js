import React, { Component } from 'react'

import { withRouter, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { listLoad } from '../../actions/list'
import { getList } from '../../reducers/list'

import styles from './index.scss';

import Card from 'react-bootstrap/lib/Card'
import CardColumns from 'react-bootstrap/lib/CardColumns'

@withRouter
@connect(
  (state, props) => ({
    list: getList(state, 'list')
  }),
  dispatch => ({
    listLoad: bindActionCreators(listLoad, dispatch)
  })
)
export class List extends Component {

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
    const { list, scrollLoad, key } = this.props
    if (!list.data) this.load();
    if (scrollLoad) ArriveFooter.add(key, this.load);
  }

  componentWillUnmount() {
    const { scrollLoad, key } = this.props;
    if (scrollLoad) ArriveFooter.remove(key);
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
      <CardColumns>
        {loading ? <div>loading</div> : null }
        {
          data.map(item =>
            <Link key={item.id} to={`/bangumi/${item.id}`}>
              <Card>
                <Card.Img variant="top" src={item.pic} />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>
                    {item.status}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          )}
      </CardColumns>
    )
  }
}

export default List
