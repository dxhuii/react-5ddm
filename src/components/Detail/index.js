import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { detail } from '../../store/actions/detail'
import { mark } from '../../store/actions/mark'
import { score } from '../../store/actions/score'
import { hits } from '../../store/actions/hits'
import { getDetail, getScore } from '../../store/reducers/detail'
import { getUserInfo } from '../../store/reducers/user'

import Meta from '../../components/Meta'

import './style.scss'

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
    getCm: bindActionCreators(score, dispatch),
    hits: bindActionCreators(hits, dispatch)
  })
)
class Detail extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    info: PropTypes.object.isRequired,
    detail: PropTypes.func.isRequired,
    getCm: PropTypes.func.isRequired,
    sid: PropTypes.number,
    userinfo: PropTypes.object,
    cmScore: PropTypes.object,
    hits: PropTypes.func,
    subTitle: PropTypes.string,
    isMeta: PropTypes.any
  }

  componentDidMount() {
    const {
      match: {
        params: { id }
      },
      info,
      detail,
      getCm,
      sid = 1,
      userinfo: { userid },
      cmScore,
      hits
    } = this.props
    if (!info || !info.data) {
      detail({
        id
      })
    }
    if (!cmScore || !cmScore.data) {
      getCm({
        id,
        sid,
        uid: userid
      })
    }
    hits({
      id,
      sid
    })
  }

  addMark(type, id, cid, uid) {
    console.log(type, id, cid, uid)
  }

  render() {
    const {
      info: { data = {}, loading },
      isMeta,
      subTitle,
      userinfo: { userid }
    } = this.props
    const { id, cid, name, content, pic, actor, area, aliases, gold, filmtime, total, director, type, language } = data
    return (
      <div styleName="detail">
        {loading ? <div> loading... </div> : null}
        {isMeta ? (
          <Meta title={name}>
            <meta property="og:locale" content="zh_CN" />
            <meta property="og:type" content="videolist" />
            <meta property="og:title" content={name} /> <meta property="og:description" content={content} />{' '}
            <meta property="og:image" content={pic} />
            <meta property="og:url" content={`/subject/${id}`} /> <meta property="og:video" content={`/play/${id}/1`} />{' '}
            <meta property="og:site_name" content={'9站'} />
            <meta name="description" content={content} /> <meta name="keywords" content={name} />
          </Meta>
        ) : null}
        {/* <div styleName='blur' style={{backgroundImage: `url(${pic})`}}></div> */}
        <div styleName="detail-con" className="clearfix">
          <h1>
            <Link to={`/subject/${data.id}`}> {name} </Link> {subTitle ? ` ${subTitle}` : null}
          </h1>
          {/* <div styleName="pic"><img src={pic} /></div> */}
          <div styleName="info">
            <p>{actor}</p>
            <p>{area}</p>
            <p>{aliases}</p>
            <p>{total}</p>
            <p>{filmtime}</p>
            <p>{director}</p>
            <p>{type}</p>
            <p>{language}</p>
          </div>
          <div styleName="score"> {gold} </div>
        </div>
        <div onClick={() => this.addMark('love', id, cid, userid)}> 收藏 </div>{' '}
        <div onClick={() => this.addMark('remind', id, cid, userid)}> 订阅 </div>
      </div>
    )
  }
}

export default Detail
