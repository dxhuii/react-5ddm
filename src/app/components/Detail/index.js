import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { isNumber, formatPic } from '@/utils'

import './style.scss'

export default function MiniDetail({ title, pic, gold, vid, pid, status, year, mcid }) {
  return (
    <div styleName='detail-mini'>
      <Link to={`/subject/${vid}`}>
        <img src={formatPic(pic, 'orj360')} alt={title} />
      </Link>
      <div styleName='detail-info'>
        <p>
          <Link to={`/subject/${vid}`}>{title}</Link> <b>{gold}</b>
        </p>
        <p>
          状态：
          <Link to={`/subject/${vid}`}>{isNumber(status) ? `更新至${status}话` : status}</Link>
        </p>
        {year ? <p>{year}年首播</p> : null}
        {mcid ? (
          <p styleName='clamp'>
            {mcid.map((item, index) =>
              index === mcid.length - 1 ? <span key={item.id}>{item.title}</span> : <span key={item.id}>{item.title} / </span>
            )}
          </p>
        ) : null}
      </div>
    </div>
  )
}

MiniDetail.defaultProps = {
  mcid: [],
  pic: ''
}

MiniDetail.propTypes = {
  title: PropTypes.string,
  pic: PropTypes.string,
  gold: PropTypes.string,
  vid: PropTypes.number,
  pid: PropTypes.number,
  status: PropTypes.any,
  year: PropTypes.number,
  mcid: PropTypes.array
}
