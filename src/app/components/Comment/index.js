import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import './style.scss'

class Comment extends PureComponent {
  static defaultProps = {
    data: []
  }
  static propTypes = {
    data: PropTypes.array
  }
  render() {
    console.log(this.props)
    const { data = [] } = this.props
    return (
      <div styleName="comment">
        <div styleName="comment-form">
          <textarea cols="4" />
          <button>评论</button>
        </div>
        <div styleName="comment-list">
          {data.length < 0 ? (
            <div styleName="comment-empty" className="tac">
              暂无评论，抢少发
            </div>
          ) : (
            <ul styleName="comment-list__list" className="mt20">
              {data.map(item => (
                <li key={item.cm_id}>
                  <div styleName="commit-list__people">
                    <div styleName="avatar">
                      <img src={item.avatar} />
                      {item.nickname}
                    </div>
                    <div styleName="commit-list__zan">
                      有用({item.cm_support}) 没用({item.cm_oppose})
                    </div>
                  </div>
                  <div styleName="commit-list__content">
                    {item.cm_content}
                    {item.cm_sub.length > 0 ? (
                      <ul styleName="commit_sublist" className="mt10">
                        {item.cm_sub.map(subItem => (
                          <li key={subItem.cm_id}>
                            <div styleName="commit-list__people">
                              <span styleName="title">
                                {subItem.at ? (
                                  <span>
                                    <Link to={`/people/${subItem.cm_uid}`}>{subItem.nickname}</Link> 回复了
                                    <Link to={`/people/${subItem.at.cm_uid}`}> {subItem.at.nickname}</Link>
                                  </span>
                                ) : (
                                  <Link to={`/people/${subItem.cm_uid}`}>{subItem.nickname}</Link>
                                )}
                              </span>
                              <span styleName="time">{subItem.cm_addtime}</span>
                              <div styleName="commit-list__zan">
                                有用({subItem.cm_support}) 没用({subItem.cm_oppose})
                              </div>
                            </div>
                            <div styleName="commit-list__content">{subItem.cm_content}</div>
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
}

export default Comment
