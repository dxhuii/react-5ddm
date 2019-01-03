import React, { Component } from 'react'

import './style.scss'

class Comment extends Component {
  render() {
    return (
      <div styleName="comment">
        <div styleName="comment-form">
          <textarea cols="4" />
          <button>评论</button>
        </div>
        <div styleName="comment-list">
          <div styleName="comment-empty" className="tac">
            暂无评论，抢少发
          </div>
          <ul styleName="comment-list__list">
            <li>
              <div>11</div>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Comment
