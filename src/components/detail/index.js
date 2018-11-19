import React, { Component } from 'react'

import { withRouter, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { detail } from '../../actions/detail'
import { mark } from '../../actions/mark'
import { score } from '../../actions/score'
import { getDetail, getScore } from '../../reducers/detail'
import user, { getUserInfo } from '../../reducers/user'

import Meta from '../../components/meta'

import './style.scss';

@withRouter
@connect(
  (state, props) => ({
    info: getDetail(state, props.match.params.id),
    userinfo: getUserInfo(state),
    cmScore: getScore(state, props.match.params.id, 1, getUserInfo(state).userid || 0)
  }),
  dispatch => ({
    detail: bindActionCreators(detail, dispatch),
    mark: bindActionCreators(mark, dispatch),
    getCm:  bindActionCreators(score, dispatch),
  })
)
export class Detail extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { match: { params: { id } }, info, detail, getCm, sid = 1, userinfo: { userid }, cmScore } = this.props

    if (!info || !info.data) {
      detail({ id })
    }
    if (!cmScore || !cmScore.data) {
      getCm({ id, sid, uid: userid })
    }

  }

  addMark(type, id, cid, uid) {
    console.log(type, id, cid, uid)
  }

  render() {
    const { info: { data = {}, loading }, isMeta, subTitle, userinfo: { userid } } = this.props
    const { id, cid, name, content, pic, actor, area, aliases, gold, update_date, filmtime, total, director, type, language } = data
    const meta = {
      name: {
        keywords: name
      },
      property: {
        'og:type': 'videolist',
        'og:title': name,
        'og:description': content,
        'og:image': pic,
        'og:url': `/bangumi/${id}`,
        'og:video': `/play/${id}/1`
      }
    }
    return(
      <div styleName="detail">
        { loading ? <div>loading...</div> : null }
        { isMeta ? <Meta title={name} keywords={name} description={name} meta={meta} /> : null }
        {/* <div styleName='blur' style={{backgroundImage: `url(${pic})`}}></div> */}
        <div styleName='detail-con' className='clearfix'>
          <h1><Link to={`/bangumi/${data.id}`}>{ name }</Link>{ subTitle ? ` ${subTitle}` : null }</h1>
          {/* <div styleName="pic"><img src={pic} /></div> */}
          <div styleName='info'>
            <p></p>
          </div>
          <div styleName='score'>{gold}</div>
        </div>
        <div onClick={() => this.addMark('love', id, cid, userid)}>收藏</div>
        <div onClick={() => this.addMark('remind', id, cid, userid)}>订阅</div>
      </div>
    )
  }
}

export default Detail;
