import React from 'react'
import ScrollTop from '@/components/ScrollTop'
import { name, eMail, domain } from 'Config'
import './style.scss'

export default () => {
  return (
    <footer styleName='footer' className='wp tac mt20'>
      ©{new Date().getFullYear()} {name}[{domain.split('//www.')[1]}] 联系邮箱：{eMail}
      <ScrollTop />
    </footer>
  )
}
