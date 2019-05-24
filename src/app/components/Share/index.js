import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import QRCode from 'qrcode.react'

import { DOMAIN, NAME } from 'Config'
import weixin from '@/utils/weixin'

import './style.scss'

export default function Share({ data = {}, location = {} }) {
  const [displayTips, showTips] = useState(false)
  const [showQrcode, showQRcode] = useState(false)

  const shareToWeiXin = () => {
    if (weixin.in) {
      showTips(true)
    } else {
      showQRcode(true)
    }
  }

  const goShare = type => {
    const { title, desc, pic, url } = data
    const enUrl = encodeURIComponent(`${DOMAIN}${url}`)
    const enTitle = encodeURIComponent(title)
    const enPic = encodeURIComponent(pic)
    const enDesc = encodeURIComponent(desc)
    const enName = encodeURIComponent(NAME)
    const enFrom = encodeURIComponent('来自' + NAME + ' ' + DOMAIN)
    const site = {
      qq: `https://connect.qq.com/widget/shareqq/index.html?url=${enUrl}&title=${enTitle}&desc=&summary=${enDesc}&pics=${enPic}&site=${enName}`,
      weibo: `https://service.weibo.com/share/share.php?appkey=111884427&url=${enUrl}&title=${enTitle}&pic=${enPic}`,
      qzone: `https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${enUrl}&title=${enTitle}&desc=${enFrom}&summary=${enDesc}&pics=${enPic}&site=${enName}`,
      tieba: `https://tieba.baidu.com/f/commit/share/openShareApi?title=${enTitle}&url=${enUrl}?to=tieba&pic=${enPic}&key=&sign=on&desc=${enDesc}&comment=&red_tag=u2625676433`,
      facebook: `https://www.facebook.com/sharer/sharer.php?s=100&p[title]=${enTitle}p[summary]=${enDesc}&p[url]=${enUrl}&p[images]=${enPic}`,
      twitter: `https://twitter.com/intent/tweet?text=${enTitle}&url=${enUrl}`
    }
    window.open(site[type], '_blank', 'width=770,height=620')
  }

  useEffect(() => {
    const { _s } = location && location.params ? location.params : {}

    if (_s === 'weixin') {
      showTips(true)
    }
  }, [location])

  return (
    <Fragment>
      <i styleName="wechat" onClick={shareToWeiXin} />
      <i styleName="weibo" onClick={() => goShare('weibo')} />
      <i styleName="tieba" onClick={() => goShare('tieba')} />
      <i styleName="qzone" onClick={() => goShare('qzone')} />
      <i styleName="qq" onClick={() => goShare('qq')} />
      <i styleName="facebook" onClick={() => goShare('facebook')} />
      <i styleName="twitter" onClick={() => goShare('twitter')} />
      <Fragment>
        {showQrcode ? (
          <div
            styleName="mark"
            onClick={e => {
              showQRcode(false)
            }}
          />
        ) : null}

        {showQrcode ? (
          <div styleName="qrcode">
            <QRCode value={`${DOMAIN}${data.url}?_s=weixin`} />
            <div>微信扫一扫，分享</div>
          </div>
        ) : null}

        <div
          styleName="tips-weixin-share"
          style={{ display: displayTips ? 'block' : 'none' }}
          onClick={() => {
            showTips(false)
          }}
        >
          <div>
            点击右上角 ... 按钮，
            <br />
            将此页面分享给你的朋友或朋友圈
          </div>
        </div>
      </Fragment>
    </Fragment>
  )
}

Share.propTypes = {
  data: PropTypes.object,
  location: PropTypes.object
}
