import React, { useEffect } from 'react'
import Vditor from 'vditor'

const e = React.createElement

export default function () {
  useEffect(() => {
    const vditor = new Vditor('vditor', {
      height: 360,
      toolbarConfig: {
        pin: true
      },
      cache: {
        enable: false
      },
      after() {
        vditor.setValue('Hello, Vditor + React!')
      }
    })
  })

  return e('div', { id: 'vditor' })
}
