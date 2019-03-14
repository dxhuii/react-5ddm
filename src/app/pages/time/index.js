import React, { Component, Fragment } from 'react'
import { withRouter, Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { detail } from '@/store/actions/detail'
import { getDetail } from '@/store/reducers/detail'

import Shell from '@/components/Shell'
import Meta from '@/components/Meta'

import SideBar from '@/components/SideBar'
import TagShare from '@/components/TagShare'

import { NAME } from 'Config'

import './style.scss'

@Shell
@withRouter
@connect(
  (state, props) => ({
    info: getDetail(state, props.match.params.id)
  }),
  dispatch => ({
    detail: bindActionCreators(detail, dispatch)
  })
)
class Time extends Component {
  static propTypes = {
    match: PropTypes.object,
    detail: PropTypes.func,
    info: PropTypes.object
  }

  componentDidMount() {
    const {
      match: {
        params: { id }
      },
      detail,
      info
    } = this.props
    if (!info.data) {
      detail({ id })
    }
  }

  render() {
    const {
      info: { data = {} }
    } = this.props
    const { id, title, content, listNameBig, pic, actor, year, filmtime, director, mcid, updateDate, tvcont } = data
    const shareConfig = {
      pic,
      title: `#${title}#播出时间_${listNameBig}${title}更新时间,${title}几点更新,${title}周几更新 - #${NAME.split('_').join('##')}# @99496动漫网`,
      desc: content,
      url: `/time/${id}`
    }
    return (
      <div className="wp mt20 clearfix">
        <Meta title={`${title}播出时间_${listNameBig}${title}更新时间,${title}几点更新,${title}周几更新`}>
          <meta name="keywords" content={`${title}播出时间,${listNameBig}${title}播出周期,${title}几点更新,${title}更新时间`} />
          <meta name="description" content={`{$sitename}为你提供了包括${listNameBig}${title}播出时间、${title}周几更新以及${title}播出周期希望你能喜欢`} />
        </Meta>
        <div className="fl left">
          <article styleName="article-body">
            <h1>{title}</h1>
            <div styleName="article-content" className="clearfix">
              <Link to={`/subject/${id}`}>
                <img src={pic} alt={`${title} 播出时间`} />
              </Link>
              <p>
                播出时间：{filmtime ? `${filmtime}` : `${year}年`} {tvcont}
              </p>
              <p>
                {title}是
                {actor && (
                  <span>
                    由
                    {actor.map((item, index) => (
                      <b key={index}>{item.title}</b>
                    ))}
                    等主演的
                  </span>
                )}
                {director && (
                  <span>
                    以及
                    {director.map((item, index) => (
                      <b key={index}>{item.title}</b>
                    ))}
                    等编导的
                  </span>
                )}
                {mcid && (
                  <span>
                    一部
                    {mcid.map((item, index) => (
                      <b key={index}>{item.title}</b>
                    ))}
                    的动画，
                  </span>
                )}
                {filmtime ? (
                  <span>
                    从<b>{filmtime}</b>起开始
                  </span>
                ) : (
                  <span>
                    从<b>{year}</b>年起开始
                  </span>
                )}
                在本网站播出，敬请关注！
              </p>
              <p styleName="content">
                {title}简介：{content.replace(/<[^<>]+>/g, '')}
              </p>
              <p>
                <em>最后更新:</em>
                {updateDate}
              </p>
            </div>
            <TagShare tag={[title]} config={shareConfig} />
          </article>
        </div>
        <div className="fr right">
          <SideBar />
        </div>
      </div>
    )
  }
}

export default Time
