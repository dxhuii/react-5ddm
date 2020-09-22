import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// redux
import { useStore, useSelector } from 'react-redux'
import { simple } from '@/store/actions/simple'
import { mark, digg } from '@/store/actions/mark'
import { getSimple } from '@/store/reducers/simple'
import Loading from '@/components/Ui/Loading'
import Toast from '@/components/Toast'

// 壳组件
import Shell from '@/components/Shell'
import Meta from '@/components/Meta'

import { isNumber, formatPic } from '@/utils'
import { DESCRIBE, KEYWORDS, DESCRIPTION } from 'Config'

import './style.scss'

export default Shell(() => {
  const [height, setHeight] = useState(0)
  const info = useSelector(state => getSimple(state))
  const store = useStore()

  const menu = {
    201: 'tv',
    202: 'ova',
    203: 'juchang',
    4: 'tebie',
    204: 'zhenren',
    35: 'qita'
  }

  useEffect(() => {
    const getData = args => simple(args)(store.dispatch, store.getState)
    if (!info.data) {
      getData()
    }
    ArriveFooter.add('simple', getData)
    setHeight(window.innerHeight - 61)
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

  const { data = [], loading } = info

  console.log(loading)

  if (!Loading) return <Loading />
  return (
    <div className='wp mt20'>
      <Meta title={DESCRIBE}>
        <meta name='keywords' content={KEYWORDS} />
        <meta name='description' content={DESCRIPTION} />
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
                {item.music ? <span>音乐</span> : null}
                {item.role ? <span>角色</span> : null}
                {item.part ? <Link to={`/episode/${item.id}`}>剧情</Link> : null}
                {item.lines ? <span>插曲</span> : null}
                {item.theme ? <span>话题</span> : null}
                {item.picture ? <span>图片</span> : null}
                <Link to={`/time/${item.id}`} title='播出时间'>
                  时间
                </Link>
              </p>
              <div styleName='list-play'>哪可以看：{item.play && item.play.map(play => <span key={play}>{play}</span>)}</div>
              <div styleName='list-gold'>
                {item.gold ? (
                  <div>
                    <span className={`${starClass(item.gold * 5)} bigstar`} /> {item.gold} 分
                  </div>
                ) : (
                  '暂无评分'
                )}
              </div>
              <p styleName='list-opa'>
                <a>订阅</a>
                <a>收藏</a>
                <a onClick={() => onDigg('up', item.id)}>
                  <i className='iconfont'>&#xe607;</i> {item.up}
                </a>
                <a onClick={() => onDigg('down', item.id)}>
                  <i className='iconfont'>&#xe606;</i> {item.down}
                </a>
                {item.time}更新 {item.status}
              </p>
            </div>
          </li>
        ))}
      </div>
      {loading ? <Loading /> : null}
    </div>
  )
})
