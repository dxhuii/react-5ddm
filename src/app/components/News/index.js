import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

// redux
import { useStore, useSelector } from 'react-redux'
import { newsIndex } from '@/store/actions/newsIndex'
import { getNewsIndex } from '@/store/reducers/newsIndex'

import Loading from '@/components/Ui/Loading'
import { formatPic } from '@/utils'

import './style.scss'

const News = ({ name }) => {
  const info = useSelector(state => getNewsIndex(state, name))
  const store = useStore()

  useEffect(() => {
    const getData = args => newsIndex(args)(store.dispatch, store.getState)
    if (!info.data) {
      getData({ name })
    }
  })

  const { data = [], loading } = info || {}

  const showData = () => {
    return data.map(item => (
      <li key={item.id}>
        <Link to={`/article/${item.id}`}>
          <div className='load-demand' data-load-demand={`<img src="${formatPic(item.pic, 'orj360')}" alt="${item.title}" />`} />
          <div styleName='mark'>
            <p>{item.title}</p>
          </div>
        </Link>
      </li>
    ))
  }

  return (
    <>
      <div className='title'>
        <h2>
          <i className='title-icon news' /> 新闻
        </h2>
        <div styleName='tab'>
          <span>分类</span>
          <ul styleName='news-tab'>
            <li>
              <Link to='/news/donghua'>动画</Link>
            </li>
            <li>
              <Link to='/news/manhua'>漫画</Link>
            </li>
            <li>
              <Link to='/news/bagua'>八卦</Link>
            </li>
            <li>
              <Link to='/news/jianping'>简评</Link>
            </li>
            <li>
              <Link to='/news/cosplay'>COS</Link>
            </li>
            <li>
              <Link to='/news/chanye'>产业</Link>
            </li>
            <li>
              <Link to='/news/cast'>声优</Link>
            </li>
            <li>
              <Link to='/news/pic'>美图</Link>
            </li>
            <li>
              <Link to='/news/video'>短视频</Link>
            </li>
          </ul>
        </div>
        <Link to='/news'>
          更多
          <i className='iconfont'>&#xe65e;</i>
        </Link>
      </div>
      <ul styleName='newslist'>
        {loading ? <Loading /> : null}
        {showData()}
      </ul>
    </>
  )
}

News.propTypes = {
  name: PropTypes.string
}

News.loadDataOnServer = async ({ store, match, res, req, user }) => {
  await newsIndex({ name: 'newsPicList' })(store.dispatch, store.getState)
}

export default News
