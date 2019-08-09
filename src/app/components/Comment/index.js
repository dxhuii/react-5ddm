import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import './style.scss'

export default function comment({ data }) {
  return (
    <div styleName="comment">
      <div styleName="comment-list">
        {data.length < 0 ? (
          <div styleName="comment-empty" className="tac">
            暂无评论，抢少发
          </div>
        ) : (
          <ul styleName="comment-list__list" className="mt20">
            {data.map(item => (
              <li key={item.id}>
                <div styleName="commit-list__people">
                  <div styleName="avatar">
                    <img src={item.avatar} />
                    {item.nickname}
                  </div>
                  <div styleName="commit-list__zan">
                    有用({item.up}) 没用({item.down})
                  </div>
                </div>
                <div styleName="commit-list__content">
                  {item.content}
                  {(item.sub || []).length > 0 ? (
                    <ul styleName="commit_sublist" className="mt10">
                      {item.sub.map(subItem => (
                        <li key={subItem.id}>
                          <div styleName="commit-list__people">
                            <span styleName="title">
                              {subItem.at ? (
                                <span>
                                  <Link to={`/people/${subItem.uid}`}>{subItem.nickname}</Link> 回复了
                                  <Link to={`/people/${subItem.at.uid}`}> {subItem.at.nickname}</Link>
                                </span>
                              ) : (
                                <Link to={`/people/${subItem.uid}`}>{subItem.nickname}</Link>
                              )}
                            </span>
                            <span styleName="time">
                              {subItem.floor}楼 {subItem.time}
                            </span>
                            <div styleName="commit-list__zan">
                              有用({subItem.up}) 没用({subItem.down})
                            </div>
                          </div>
                          <div styleName="commit-list__content">{subItem.content}</div>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

comment.defaultProps = {
  data: []
}

comment.propTypes = {
  data: PropTypes.array
}
