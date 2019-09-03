import React, { useState, useEffect, useRef } from 'react'

import { ISAD } from 'Config'
import { loadScript } from '@/utils/loadScript'
import useScript from '@/utils/useScript'

export default function Ads(props) {
  const [type, setType] = useState(0)
  const [con, setCon] = useState(0)
  const [loaded, error] = useScript('//cos.mdb6.com/static/income.min.js')
  const ads = useRef(null)

  function showAd(content) {
    ads.current.innerHTML = content
  }

  useEffect(() => {
    if (ISAD) {
      const { id } = props
      if (loaded && !error) {
        if (income[id]) {
          const { type, content } = income[id]
          setType(type)
          setCon(content)
          if (type === 2 && content) {
            ads.current.innerHTML = ''
            loadScript({ src: content, dom: ads.current })
          } else if (type === 1 && content) {
            showAd(content)
          }
        }
      }
    }
    return () => {}
  }, [error, loaded, props])

  return ISAD ? <div ref={ads} className={type !== 1 && con ? 'mt20' : ''} /> : null
}
