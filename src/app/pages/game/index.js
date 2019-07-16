import React, { useState, useEffect, useCallback } from 'react'
import useReactRouter from 'use-react-router'
import QRCode from 'qrcode.react'

// redux
import { useStore, useSelector } from 'react-redux'
import { gameList } from '@/store/actions/game'
import { getGame } from '@/store/reducers/game'

import Loading from '@/components/Ui/Loading'
import Shell from '@/components/Shell'
import Meta from '@/components/Meta'

import { isMobile, formatPic } from '@/utils'

import './style.scss'

export default Shell(() => {
  const [showGame, onShowGame] = useState(false)
  const [show, onShow] = useState(false)
  const dataIndex = -1
  const {
    history,
    match: {
      params: { wd }
    }
  } = useReactRouter()

  const store = useStore()
  const info = useSelector(state => getGame(state, wd ? wd : 'totalList'))

  const getGameData = useCallback(() => {
    const getData = args => gameList(args)(store.dispatch, store.getState)
    getData({
      order: 'update',
      wd: 'totalList',
      limit: 100
    })
  }, [store.dispatch, store.getState])

  useEffect(() => {
    const getData = args => gameList(args)(store.dispatch, store.getState)
    if (wd) {
      onShowGame(true)
    }
    if (!info.data) {
      if (wd) {
        getData({
          wd
        })
      } else {
        getGameData()
      }
    }
  }, [getGameData, info.data, store.dispatch, store.getState, wd])

  const getPic = data => {
    const piclist = data ? (
      data.map((item, i) => {
        if (item.indexOf('banner') === -1) {
          return (
            <li key={`game-img-${i}`}>
              <img src={formatPic(item)} />
            </li>
          )
        }
      })
    ) : (
      <Loading />
    )
    return piclist
  }

  const game = name => {
    if (wd) {
      history.push('/game')
      getGameData()
    } else {
      history.push(`/game/${name}`)
    }
  }

  const gameShowlist = (data = []) => {
    const renderList = data ? (
      data.map((item, i) => {
        if (item.downloadUrl.android.indexOf('http') != -1 || item.downloadUrl.ios.indexOf('http') != -1) {
          return (
            <li key={`game-list-${i}`} onClick={() => game(item.name)}>
              <img src={formatPic(item.icon)} />
              <p>{item.name}</p>
              <div>
                {item.downloadUrl.android.indexOf('http') != -1 ? (
                  isMobile() ? (
                    <a className="an" href={item.downloadUrl.android}>
                      安卓
                    </a>
                  ) : (
                    <span className="qrcode">
                      <a className="an" href={item.downloadUrl.android}>
                        安卓
                      </a>
                      <span className="an">
                        <i />
                        <QRCode value={item.downloadUrl.android} />
                        <p>安卓用户扫描下载</p>
                      </span>
                    </span>
                  )
                ) : null}
                {item.downloadUrl.ios.indexOf('http') != -1 ? (
                  isMobile() ? (
                    <a className="ios" href={item.downloadUrl.android}>
                      苹果
                    </a>
                  ) : (
                    <span className="qrcode">
                      <a className="ios" href={item.downloadUrl.ios}>
                        苹果
                      </a>
                      <span className="ios">
                        <i />
                        <QRCode value={item.downloadUrl.ios} />
                        <p>苹果用户扫描下载</p>
                      </span>
                    </span>
                  )
                ) : null}
              </div>
            </li>
          )
        }
      })
    ) : (
      <Loading />
    )
    return renderList
  }

  const { data = [], loading } = info

  const dataInfo = data[wd ? 0 : dataIndex]
  const { shortDesc, name } = dataInfo || {}
  if (loading) return <Loading />
  return (
    <>
      {wd ? (
        <Meta title={`${name}_${name}安卓IOS下载`}>
          <meta name="keywords" content={`${name},${name}安卓下载,${name}IOS下载`} />
          <meta name="description" content={shortDesc} />
        </Meta>
      ) : (
        <Meta title="游戏列表_安卓IOS游戏下载">
          <meta name="keywords" content="游戏列表,手机游戏下载,安卓游戏下载,IOS游戏下载" />
          <meta name="description" content="提供安卓和IOS游戏下载" />
        </Meta>
      )}
      {loading ? <Loading /> : null}
      <div className="wp">
        {wd ? null : <ul className="gamelist clearfix">{gameShowlist(data)}</ul>}
        {dataInfo && (
          <div className="gameinfo" style={{ display: showGame ? 'block' : 'none' }}>
            <span className="safari-close closeA" onClick={game} />
            <div className="info clearfix">
              <img src={formatPic(dataInfo.icon)} />
              <div className="type">
                <h1>{dataInfo.name}</h1>
                {dataInfo.shortDesc ? <p>{dataInfo.shortDesc}</p> : ''}
                {dataInfo.Type ? <p>类型：{dataInfo.Type}</p> : ''}
              </div>
              <div className="down">
                {dataInfo.downloadUrl.android.indexOf('http') != -1 ? (
                  isMobile() ? (
                    <a className="an" href={dataInfo.downloadUrl.android}>
                      安卓 <em className="version">{dataInfo.Version.android}</em>
                      <em>{dataInfo.size.android}MB</em>
                    </a>
                  ) : (
                    <span className="qrcode">
                      <a className="an" href={dataInfo.downloadUrl.android}>
                        安卓 <em className="version">{dataInfo.Version.android}</em>
                        <em>{dataInfo.size.android}MB</em>
                      </a>
                      <span className="an">
                        <i />
                        <QRCode value={dataInfo.downloadUrl.android} />
                        <p>安卓用户扫描下载</p>
                      </span>
                    </span>
                  )
                ) : null}
                {dataInfo.downloadUrl.ios.indexOf('http') != -1 ? (
                  isMobile() ? (
                    <a className="ios" href={dataInfo.downloadUrl.ios}>
                      苹果 <em className="version">{dataInfo.Version.ios}</em>
                      <em>{dataInfo.size.ios}MB</em>
                    </a>
                  ) : (
                    <span className="qrcode">
                      <a className="ios" href={dataInfo.downloadUrl.ios}>
                        苹果 <em className="version">{dataInfo.Version.ios}</em>
                        <em>{dataInfo.size.ios}MB</em>
                      </a>
                      <span className="ios">
                        <i />
                        <QRCode value={dataInfo.downloadUrl.ios} />
                        <p>苹果用户扫描下载</p>
                      </span>
                    </span>
                  )
                ) : null}
              </div>
            </div>
            <div className="summary">{dataInfo.Description}</div>
            <div className="piclist">
              <ul>{getPic(dataInfo.imgList)}</ul>
            </div>
          </div>
        )}
        <div className="mask" style={{ display: showGame ? 'block' : 'none' }} onClick={game} />
        <div className="safariDown" style={{ display: show ? 'block' : 'none' }}>
          <div className="join row">
            <span className="join-left">
              <a href="http://app.guopan.cn/?channelid=12633">
                <img src="//cdn2.guopan.cn/frontend/m/static/img/join_e476d12.png" width="50" height="50" />
              </a>
            </span>
            <div className="join-middel col">
              <p className="j-head">果盘游戏</p>
              <p className="j-desc">玩手游更轻松</p>
            </div>
            <div className="join-right">
              <a href="http://app.guopan.cn/?channelid=12633" className="j-link">
                立即下载
              </a>
            </div>
          </div>
          <i className="safari-close" onClick={() => onShow(false)} />
        </div>
      </div>
    </>
  )
})
