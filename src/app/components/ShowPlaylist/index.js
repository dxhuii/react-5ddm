import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// redux
import { useStore, useSelector } from 'react-redux'
import { playlistType } from '@/store/actions/playlist'
import { getPlayList } from '@/store/reducers/playlist'

import BaseLoading from '@/components/BaseLoading'

import { Base64 } from 'js-base64'
import { getName, format } from '@/utils'
import authcode from '@/utils/authcode'

import './style.scss'

const ShowPlaylist = ({ id, type }) => {
  const store = useStore()
  const info = useSelector(state => getPlayList(state, `${type}_${id}`))
  let playerName

  const { data = {}, loading = true } = info
  const { key, list = [], playName, playTitle, all = [] } = data

  useEffect(() => {
    const getData = args => playlistType(args)(store.dispatch, store.getState)
    if (!info.data) {
      getData({ id, type })
    }
  }, [id, info.data, store.dispatch, store.getState, type])

  const playlist = () => {
    const arr = []
    if (all.length) {
      all.map(({ vid, price }) => {
        const v = authcode(Base64.atob(vid), 'DECODE', key, 0)
        if (getName(v)[1] === type) {
          arr.push({ title: '全集', vid: vid })
          if (!playTitle) playerName = getName(v)[0]
        }
      })
    }
    const data = [...arr, ...list]
    return data.length
      ? data.map(({ title, vid }) => {
          const [num, subName] = format(title)
          return (
            <a key={vid} href={authcode(Base64.atob(vid), 'DECODE', key, 0)} target='_blank' rel='noopener noreferrer' title={title}>
              <p>{num}</p>
              {subName ? <p>{subName}</p> : null}
            </a>
          )
        })
      : []
  }

  if (loading) {
    return <BaseLoading height={100} />
  }

  return playlist().length ? (
    <div className='right-box'>
      <div className='right-title'>
        <h2>{playTitle || playerName}</h2>
      </div>
      <div styleName='showlist'>
        <div styleName='showbox'>{playlist()}</div>
      </div>
    </div>
  ) : null
}

ShowPlaylist.propTypes = {
  id: PropTypes.number,
  type: PropTypes.string
}

export default ShowPlaylist
