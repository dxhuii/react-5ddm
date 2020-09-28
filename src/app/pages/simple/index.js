import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// redux
import { useStore, useSelector } from 'react-redux'
import { simple } from '@/store/actions/simple'
import { digg } from '@/store/actions/mark'
import { getSimple } from '@/store/reducers/simple'
import BaseLoading from '@/components/BaseLoading'
import ShowPlaylist from '@/components/ShowPlaylist'
import Modal from '@/components/Modal'
import Toast from '@/components/Toast'

// 壳组件
import Shell from '@/components/Shell'
import Meta from '@/components/Meta'

import { isNumber, formatPic, getName } from '@/utils'
import { describe, keywords, description } from 'Config'

import { Base64 } from 'js-base64'
import authcode from '@/utils/authcode'

import './style.scss'

const Simple = () => {
  const [visible, onModal] = useState(false)
  const [params, onShowPlay] = useState({})
  const info = useSelector(state => getSimple(state))
  const store = useStore()

  const { data = [], loading = true } = info

  const menu = {
    201: 'tv',
    202: 'ova',
    203: 'juchang',
    204: 'zhenren',
    4: 'tebie',
    35: 'qita'
  }

  useEffect(() => {
    const getData = args => simple(args)(store.dispatch, store.getState)
    if (!info.data) {
      getData()
    }
    ArriveFooter.add('simple', getData)
    return () => {
      ArriveFooter.remove('simple')
    }
  }, [info.data, store.dispatch, store.getState])

  const starClass = pfnum => {
    let pfclass = ''
    if (pfnum >= 50) {
      pfclass = 'bigstar50'
    } else if (pfnum >= 45) {
      pfclass = 'bigstar45'
    } else if (pfnum >= 40) {
      pfclass = 'bigstar40'
    } else if (pfnum >= 35) {
      pfclass = 'bigstar35'
    } else if (pfnum >= 30) {
      pfclass = 'bigstar30'
    } else if (pfnum >= 35) {
      pfclass = 'bigstar35'
    } else if (pfnum >= 20) {
      pfclass = 'bigstar20'
    } else if (pfnum >= 15) {
      pfclass = 'bigstar15'
    } else if (pfnum >= 10) {
      pfclass = 'bigstar10'
    } else if (pfnum >= 5) {
      pfclass = 'bigstar5'
    } else if (pfnum >= 0) {
      pfclass = 'bigstar0'
    }
    return pfclass
  }

  const onDigg = async (type, id) => {
    const onDigg = args => digg(args)(store.dispatch, store.getState)
    const [, res] = await onDigg({ type, id })
    if (res.code === 1) {
      Toast.success(res.msg)
    }
  }

  const onShow = ({ id, type }) => {
    onShowPlay({
      id,
      type
    })
    onModal(true)
  }

  const see = ({ play, all, id }) => {
    return all
      ? all.all.map(({ vid }) => {
          const url = v => authcode(Base64.atob(v), 'DECODE', all.key, 0)
          const v = url(vid)
          return (
            <i key={v} className={`playicon ${getName(v)[1]}`} title={getName(v)[0]} onClick={() => onShow({ id, type: getName(v)[1] })} />
          )
        })
      : play.map(play => play && <i key={play} className={`playicon ${play}`} title={play} />)
  }

  return (
    <div className='wp mt20'>
      <Meta title={describe}>
        <meta name='keywords' content={keywords} />
        <meta name='description' content={description} />
      </Meta>
      <div styleName='list' className='right-box'>
        {data.map(item => (
          <li key={item.id}>
            <Link to={`/subject/${item.id}`} styleName='list-pic'>
              <span>{item.area}</span>
              <span>{item.lang}</span>
              <img src={formatPic(item.pic, 'orj360')} />
            </Link>
            <div styleName='list-info'>
              <div styleName='list-title'>
                <h2>
                  <Link to={`/subject/${item.id}`}>{item.title}</Link>({item.year})
                </h2>
                <Link to={`/type/${menu[item.cid] || 'list'}/-/-/-/-/-/addtime`}>{item.name}</Link>
                {item.mcid &&
                  item.mcid.map(val => (
                    <Link to={`/type/${menu[item.cid] || 'list'}/${val.id}/-/-/-/-/addtime`} key={val.id}>
                      {val.title}
                    </Link>
                  ))}
              </div>
              {item.foreign && <h4>{item.foreign}</h4>}
              <p>
                <Link to={`/subject/${item.id}`}>详情</Link>
                {item.music ? <a>音乐</a> : null}
                {item.role ? <a>角色</a> : null}
                {item.part ? <Link to={`/episode/${item.id}`}>剧情</Link> : null}
                {item.lines ? <a>插曲</a> : null}
                {item.theme ? <a>话题</a> : null}
                {item.picture ? <a>图片</a> : null}
                <Link to={`/time/${item.id}`} title='播出时间'>
                  时间
                </Link>
              </p>
              {(item.play && item.play.length) || item.all ? (
                <div styleName='list-play' className='clearfix'>
                  <span>哪可以看：</span>
                  {see({ play: item.play, all: item.all, id: item.id })}
                </div>
              ) : null}
              <div styleName='list-gold'>
                {item.gold ? (
                  <>
                    <span className={`${starClass(item.gold * 5)} bigstar`} /> {item.gold} 分
                  </>
                ) : (
                  '暂无评分'
                )}
                {item.filmtime && <span style={{ marginLeft: 10 }}>{`首番时间：${item.filmtime} ${item.time}`}</span>}
              </div>
              <p styleName='list-opa'>
                <a>
                  <i className='iconfont'>&#xe6bd;</i> 订阅
                </a>
                <a>
                  <i className='iconfont'>&#xe66a;</i> 收藏
                </a>
                <a onClick={() => onDigg('up', item.id)}>
                  <i className='iconfont'>&#xe607;</i> {item.up}
                </a>
                <a onClick={() => onDigg('down', item.id)}>
                  <i className='iconfont'>&#xe606;</i> {item.down}
                </a>
                <span style={item.isDate ? { color: '#f99f11' } : {}}>{item.addtime}更新</span>
                {item.status === '未播出' ? (item.tvcont ? item.tvcont : item.status) : item.status}
              </p>
            </div>
          </li>
        ))}
        {loading ? <BaseLoading height={100} /> : null}
      </div>
      {params.id ? (
        <Modal cls={{ width: 895 }} visible={visible} showModal={() => onModal(true)} closeModal={() => onModal(false)}>
          <ShowPlaylist {...params} />
        </Modal>
      ) : null}
    </div>
  )
}

Simple.loadDataOnServer = async ({ store, match, res, req, user }) => {
  if (user) return { code: 200 }
  await simple()(store.dispatch, store.getState)
  return { code: 200 }
}

export default Shell(Simple)
