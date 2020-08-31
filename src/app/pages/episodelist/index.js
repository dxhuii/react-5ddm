import React, { useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'

// redux
import { useStore, useSelector } from 'react-redux'
import { episodeList } from '@/store/actions/episode'
import { getEpisodeList } from '@/store/reducers/episode'

import SideBar from '@/components/SideBar'
import Shell from '@/components/Shell'
import Meta from '@/components/Meta'

import { formatPic, isNumber } from '@/utils'

import './style.scss'

export default Shell(() => {
  const store = useStore()
  const info = useSelector(state => getEpisodeList(state, 'episodelist'))

  const load = useCallback(async () => {
    const getData = () => episodeList()(store.dispatch, store.getState)
    await getData()
  }, [store.dispatch, store.getState])

  useEffect(() => {
    if (!info.data) load()
    ArriveFooter.add('episodelist', load)
    return () => {
      ArriveFooter.remove('episodelist')
    }
  }, [info.data, load])

  const { data = [] } = info

  return (
    <>
      <Meta title='最新剧情动漫剧情,剧情动漫分集剧情,剧情动漫全集剧情'>
        <meta name='keywords' content='最新剧情动漫剧情,剧情动漫分集剧情,剧情动漫全集剧情' />
        <meta name='description' content='最新剧情动漫剧情包含等全集剧情。' />
      </Meta>
      <div className='wp mt20 clearfix'>
        <div className='left fl'>
          <ul styleName='list'>
            {data.map(item => (
              <li key={item.id}>
                <Link to={`/episode/${item.id}`}>
                  <div className='load-demand' data-load-demand={`<img src="${formatPic(item.pic, 'thumb150')}" alt="${item.title}" />`} />
                  <h4>{item.title}</h4>
                  <p>{isNumber(item.continu) ? `更新至${item.continu}话` : item.continu}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <aside className='right fr'>
          <SideBar />
        </aside>
      </div>
    </>
  )
})
