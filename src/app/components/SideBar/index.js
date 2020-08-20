import React from 'react'
import PropTypes from 'prop-types'

import NewsYG from '@/components/News/yugao'
import Top from '@/components/Top'
import ArticleVod from '@/components/Vod'
import Ads from '@/components/Ads'

export default function SideBar({ data = [] }) {
  return (
    <>
      {data.length > 0 ? <ArticleVod data={data} /> : null}
      <div className='box mt20'>
        <Top name='topListAll' title='30天热门动漫' sty={{ paddingBottom: 10 }} />
      </div>
      <div className='box mt20'>
        <NewsYG name='newsAll' isCate={false} title='30天热门资讯' isType={true} sty={{ paddingBottom: 10 }} />
      </div>
    </>
  )
}

SideBar.propTypes = {
  data: PropTypes.array,
}
