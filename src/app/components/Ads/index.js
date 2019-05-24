import React, { useState, useEffect, useRef } from 'react'

import { ISAD } from 'Config'
import { loadScript, createIframe } from '@/utils'

export default function Ads(props) {
  const [type, setType] = useState(0)
  const ads = useRef(null)

  function showAd(content) {
    ads.current.innerHTML = content
  }

  useEffect(() => {
    if (ISAD) {
      const { id } = props
      loadScript({
        src: '//cos.mdb6.com/static/income.min.js',
        end: true,
        callback: function() {
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
      })
    }
  }, [props])

  return ISAD ? <div ref={ads} className={type !== 1 ? 'mt20' : ''} /> : null
}
