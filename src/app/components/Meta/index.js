import React from 'react'
import PropTypes from 'prop-types'
import MetaTags, { ReactTitle } from 'react-meta-tags'

import { NAME } from 'Config'

export default function Meta({ title, url, children }) {
  let _title = ''
  _title += title || NAME
  if (title) url ? title : (_title += ` - ${NAME}`)
  return (
    <>
      <ReactTitle title={_title} />
      {children ? <MetaTags>{children}</MetaTags> : null}
    </>
  )
}

Meta.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any,
  url: PropTypes.string
}
