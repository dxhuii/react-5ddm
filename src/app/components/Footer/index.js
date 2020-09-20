import React from 'react'
import ScrollTop from '@/components/ScrollTop'
import { NAME, EMAIL, DOMAIN_NAME } from 'Config'
import './style.scss'

export default () => {
  return (
    <footer styleName='footer' className='wp tac mt20'>
      ©{new Date().getFullYear()} {NAME}[{DOMAIN_NAME}] 联系邮箱：{EMAIL}
      <ScrollTop />
    </footer>
  )
}
