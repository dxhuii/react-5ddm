import React, { useState, useEffect } from 'react'
import useReactRouter from 'use-react-router'

// redux
import { useStore, useSelector } from 'react-redux'
import { configLoad } from '@/store/actions/config'
import { getConfig } from '@/store/reducers/config'

import List from '@/components/List'
import Ads from '@/components/Ads'
import Shell from '@/components/Shell'
import Meta from '@/components/Meta'

import './style.scss'

export default Shell(() => {
  const {
    match: {
      params: { name, mcid, area, year, letter, lz, wd = '', order = 'addtime' },
    },
    location: { pathname },
  } = useReactRouter()

  const type = {
    tv: 201,
    ova: 202,
    juchang: 203,
    tebie: 4,
    zhenren: 204,
    qita: 35,
  }

  const [eId, getId] = useState(type[name] || 3)
  const [eMcid, getMcid] = useState(mcid ? parseInt(mcid) : '')
  const [eArea, getArea] = useState(area || '全部')
  const [eYear, getYear] = useState(year || '全部')
  const [eLetter, getLetter] = useState(letter || '全部')
  const [eOrder, getOrder] = useState(order)
  const store = useStore()
  const config = useSelector((state) => getConfig(state, 'list'))

  useEffect(() => {
    const _configLoad = (args) => configLoad(args)(store.dispatch, store.getState)
    if (!config.data) {
      _configLoad({ tag: 'list' })
    }
  }, [config, config.data, eMcid, mcid, store.dispatch, store.getState])

  const isSearch = () => {
    const search = pathname.indexOf('search') !== -1
    return search
  }

  const formatArray = (data = []) => {
    let f = [{ title: '全部', id: '' }]
    for (let i of data) {
      f.push({ title: i, id: i })
    }
    return f
  }

  const findName = (data = [], id) => {
    if (id) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].id === id) return data[i].title
      }
    } else {
      return '全部'
    }
  }

  const isAll = (name) => {
    return name === '全部' ? '' : name
  }

  const { data = {} } = config
  const idArr = [{ title: '全部', id: 3 }].concat((data.menu || {}).son || [])
  const mcidArr = [{ title: '全部', id: '' }].concat(data.mcid || [])
  const areaArr = formatArray(data.area)
  const yearArr = formatArray(data.year)
  const letterArr = formatArray(data.letter)
  // const lzArr = [{ title: '全部', id: '' }, { title: '连载', id: 1 }, { title: '完结', id: 2 }]
  const orderArr = [
    { title: '最新', id: 'addtime' },
    { title: '评分', id: 'gold' },
    { title: '热门', id: 'hits' },
  ]
  const keyword = decodeURIComponent(wd)
  const typeName = findName(idArr, eId)
  const mcidName = findName(mcidArr, eMcid)
  const t = isAll(typeName)
  const y = isAll(eYear)
  const m = isAll(mcidName)
  const l = isAll(eLetter)
  const a = isAll(eArea)
  return (
    <>
      <Meta
        title={
          isSearch()
            ? `你搜索的是《${keyword}》`
            : `动漫列表${t ? `_${t}动漫_${t}动漫排行榜` : ''}${m ? `_${m}动漫_好看的${m}动漫_最新${m}动画片大全_${m}动漫排行榜` : ''}${
                a ? `_${a}${t}大全_${a}${t}排行榜` : ''
              }${y ? `_${y}的动漫` : ''}${l ? `_字母${l}开头的动漫` : ''}`
        }
      />
      <div styleName='filter'>
        <div className='wp clearfix'>
          {(t || a || m || y || l) && (
            <dl>
              <dt>已选</dt>
              <dd>
                {t ? <a onClick={() => getId('')}>{t}</a> : null}
                {m ? <a onClick={() => getMcid('')}>{m}</a> : null}
                {/* {lzName ? <a onClick={() => this.getParams('lz', '')}>{lzName}</a> : null} */}
                {a ? <a onClick={() => getArea('')}>{a}</a> : null}
                {y ? <a onClick={() => getYear('')}>{y}</a> : null}
                {l ? <a onClick={() => getLetter('')}>{l}</a> : null}
              </dd>
            </dl>
          )}
          <dl className='clearfix'>
            <dt>分类</dt>
            <dd>
              {idArr.map((item) => (
                <a styleName={eId === item.id ? 'cur' : ''} onClick={() => getId(item.id)} key={item.id}>
                  {item.title}
                </a>
              ))}
            </dd>
          </dl>
          <dl className='clearfix'>
            <dt>类型</dt>
            <dd>
              {mcidArr.map((item) => (
                <a styleName={eMcid === item.id ? 'cur' : ''} onClick={() => getMcid(item.id)} key={item.id}>
                  {item.title}
                </a>
              ))}
            </dd>
          </dl>
          {/* <dl className="clearfix">
            <dt>连载</dt>
            <dd>
              {lzArr.map(item => (
                <a
                  styleName={lz === item.id ? 'cur' : ''}
                  onClick={() => this.getParams('lz', item.id, item.title)}
                  key={item.id}
                >
                  {item.title}
                </a>
              ))}
            </dd>
          </dl> */}
          <dl className='clearfix'>
            <dt>地区</dt>
            <dd>
              {areaArr.map((item) => (
                <a styleName={eArea === item.title ? 'cur' : ''} onClick={() => getArea(item.title)} key={item.id}>
                  {item.title}
                </a>
              ))}
            </dd>
          </dl>
          <dl className='clearfix'>
            <dt>年份</dt>
            <dd>
              {yearArr.map((item) => (
                <a styleName={eYear === item.title ? 'cur' : ''} onClick={() => getYear(item.title)} key={item.id}>
                  {item.title}
                </a>
              ))}
            </dd>
          </dl>
          <dl className='clearfix'>
            <dt>字母</dt>
            <dd>
              {letterArr.map((item) => (
                <a styleName={eLetter === item.title ? 'cur' : ''} onClick={() => getLetter(item.title)} key={item.id}>
                  {item.title}
                </a>
              ))}
            </dd>
          </dl>
          <dl className='clearfix'>
            <dt>排序</dt>
            <dd>
              {orderArr.map((item) => (
                <a styleName={eOrder === item.id ? 'cur' : ''} onClick={() => getOrder(item.id)} key={item.id}>
                  {item.title}
                </a>
              ))}
              {isSearch() ? (
                <span>
                  你搜索的是：<b>{keyword}</b>
                </span>
              ) : null}
            </dd>
          </dl>
        </div>
      </div>
      <div className='wp'>
        <List id={eId || 3} order={eOrder} letter={eLetter} year={eYear} mcid={eMcid} area={eArea} limit={30} wd={wd} scrollLoad={true} />
      </div>
    </>
  )
})
