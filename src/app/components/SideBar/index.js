import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'

import NewsYG from '@/components/News/yugao'
import Top from '@/components/Top'
import ArticleVod from '@/components/Vod'

import './style.scss'

export default class SideBar extends PureComponent {
  static propTypes = {
    vodid: PropTypes.number
  }
  render() {
    const { vodid } = this.props
    return (
      <Fragment>
        {vodid ? <ArticleVod ids={vodid} /> : null}
        <div styleName="box">
          <Top name="topListAll" title="30天热门动漫" sty={{ padding: '10px 0' }} />
        </div>
        <div styleName="box" className="mt20">
          <NewsYG name="newsAll" isCate={false} title="30天热门资讯" isType={true} sty={{ padding: '10px 0' }} />
        </div>
      </Fragment>
    )
  }
}
