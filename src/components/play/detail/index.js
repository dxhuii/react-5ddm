import React from 'react'

import { withRouter, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { detail } from '../../../actions/detail'
import { getDetail } from '../../../reducers/detail'

import Meta from '../../../components/meta'

import CSSModules from 'react-css-modules'
import styles from './index.scss';

@withRouter
@connect(
  (state, props) => ({
    info: getDetail(state, props.match.params.id)
  }),
  dispatch => ({
    detail: bindActionCreators(detail, dispatch)
  })
)
@CSSModules(styles, { allowMultiple: true })
export class Detail extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {

    const { id } = this.props.match.params;
    const { info, detail } = this.props

    if (!info || !info.data) {
      detail({ id })
    }
  }

  render() {
    const { info: { data = {}, loading }, isMeta, subTitle } = this.props
    const { id, name, content, pic, actor, area, aliases, gold, update_date, filmtime, total, director, type, language } = data
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
        <div styleName='blur' style={{backgroundImage: `url(${pic})`}}></div>
        <div styleName='detail-con' className='clearfix'>
          <h1><Link to={`/bangumi/${data.id}`}>{ name }</Link>{ subTitle ? ` ${subTitle}` : null }</h1>
          <div styleName="pic"><img src={pic} /></div>
          <div styleName='info'>
            <p></p>
          </div>
          <div styleName='score'>{gold}</div>
        </div>
      </div>
    )
  }
}

export default Detail;
