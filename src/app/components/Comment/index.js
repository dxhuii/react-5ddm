import React, { useState, useCallback, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { useStore } from 'react-redux'
import { getCode } from '@/store/actions/user'

import './style.scss'

export default function Comment({ data, submit, me, login }) {
  const store = useStore()
  const commentContent = useRef(null)
  const validate = useRef(null)
  const { userid, avatar } = me

  const [base64img, getBase64] = useState('')
  const [imgkey, getImgKey] = useState('')

  const getVerify = useCallback(async () => {
    const _getCode = () => getCode()(store.dispatch, store.getState)
    const [err, data] = await _getCode()
    if (data.code === 0) {
      const { base64img, imgkey } = data.data
      getBase64(base64img)
      getImgKey(imgkey)
    }
  }, [store.dispatch, store.getState])

  useEffect(() => {
    getVerify()
  }, [getVerify])

  const addComment = e => {
    const body = commentContent.current
    const code = validate.current
    submit(e, body, code, imgkey)
  }

  return (
    <div styleName='comment'>
      <div styleName='comment-form'>
        <div styleName='comment-avatar'>
          <img src={avatar || 'https://wxt.sinaimg.cn/large/628d024fgy1g5tfklg1lsg205k05kt8n.gif'} />
        </div>
        <form onSubmit={addComment}>
          <textarea name='content' placeholder='发条友善的评论' ref={commentContent}></textarea>
          <button disabled={!userid}>发表</button>
        </form>
        <div styleName='validate'>
          <div styleName='comment-face'>表情</div>
          <div styleName='comment-code'>
            <input type='text' name='validate' ref={validate} placeholder='请输入验证码' />
            <img src={base64img} onClick={getVerify} />
          </div>
        </div>
        {!userid ? (
          <div styleName='no-login'>
            请先<span onClick={() => login('signIn')}>登录</span>后评论 (・ω・)
          </div>
        ) : null}
      </div>
      <div styleName='comment-list'>
        {data.length === 0 ? (
          <div styleName='comment-empty' className='tac'>
            暂无评论，抢少发
          </div>
        ) : (
          <ul styleName='comment-list__list' className='mt20'>
            {data.map(item => (
              <li key={item.id}>
                <div styleName='commit-list__people'>
                  <div styleName='avatar'>
                    <img src={item.avatar} />
                    {item.username} {item.floor}楼
                  </div>
                  <div styleName='commit-list__zan'>
                    {item.time} 有用({item.up}) 没用({item.down})
                  </div>
                </div>
                <div styleName='commit-list__content'>
                  {item.content}
                  {(item.sub || []).length > 0 ? (
                    <ul styleName='commit-sublist' className='mt10'>
                      {item.sub.map(subItem => (
                        <li key={subItem.id}>
                          <div styleName='commit-list__people'>
                            <span styleName='title'>
                              {subItem.at ? (
                                <span>
                                  <Link to={`/people/${subItem.uid}`}>{subItem.username}</Link> 回复了
                                  <Link to={`/people/${subItem.at.uid}`}> {subItem.at.username}</Link>
                                </span>
                              ) : (
                                <Link to={`/people/${subItem.uid}`}>{subItem.username}</Link>
                              )}
                            </span>
                            <span styleName='time'>
                              {subItem.floor}楼 {subItem.time}
                            </span>
                            <div styleName='commit-list__zan'>
                              有用({subItem.up}) 没用({subItem.down})
                            </div>
                          </div>
                          <div styleName='commit-list__content'>{subItem.content}</div>
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
  me: PropTypes.object,
  submit: PropTypes.func,
  login: PropTypes.func
}
