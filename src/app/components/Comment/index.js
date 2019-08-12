import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Toast from '@/components/Toast'

import './style.scss'

export default function Comment({ data, submit }) {
  const commentContent = useRef(null)

  const addComment = e => {
    // e.preventDefault()
    const body = commentContent.current
    // if (!body.value) {
    //   body.focus()
    //   Toast.error('评论内容不能为空')
    //   return
    // }
    submit(e, body)
  }

  return (
    <div styleName="comment">
      <div styleName="comment-form">
        <form onSubmit={addComment}>
          <textarea ref={commentContent}></textarea>
          <button>发表</button>
        </form>
      </div>
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
                    {item.username} {item.floor}楼
                  </div>
                  <div styleName="commit-list__zan">
                    {item.time} 有用({item.up}) 没用({item.down})
                  </div>
                </div>
                <div styleName="commit-list__content">
                  {item.content}
                  {(item.sub || []).length > 0 ? (
                    <ul styleName="commit-sublist" className="mt10">
                      {item.sub.map(subItem => (
                        <li key={subItem.id}>
                          <div styleName="commit-list__people">
                            <span styleName="title">
                              {subItem.at ? (
                                <span>
                                  <Link to={`/people/${subItem.uid}`}>{subItem.username}</Link> 回复了
                                  <Link to={`/people/${subItem.at.uid}`}> {subItem.at.username}</Link>
                                </span>
                              ) : (
                                <Link to={`/people/${subItem.uid}`}>{subItem.username}</Link>
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

Comment.defaultProps = {
  data: []
}

Comment.propTypes = {
  data: PropTypes.array,
  submit: PropTypes.func
}
