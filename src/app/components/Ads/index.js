import React, { useState, useEffect, useRef } from 'react'

import { ISAD } from 'Config'
import { createIframe } from '@/utils/createIframe'
import { loadScript } from '@/utils/loadScript'
import useScript from '@/utils/useScript'

export default function Ads(props) {
  const [type, setType] = useState(0)
  const ads = useRef(null)
  const [loaded, error] = useScript('//cos.mdb6.com/static/income.min.js')

  function showAd(content) {
    ads.current.innerHTML = content
  }

  useEffect(() => {
    if (ISAD) {
      const { id } = props
      if (loaded && !error) {
        if (income[id]) {
          const { type, content, height } = income[id]
          setType(type)
          if (type === 2) {
            loadScript({ src: content, dom: ads.current })
          } else if (type === 1) {
            showAd(content)
          } else if (type === 3) {
            createIframe(ads.current, content, height)
          }
        }
      }
    }
    return () => {}
  }, [error, loaded, props])

  return ISAD ? <div ref={ads} className={type !== 1 ? 'mt20' : ''} /> : null
}
