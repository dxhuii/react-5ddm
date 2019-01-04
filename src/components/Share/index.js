import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import QRCode from 'qrcode.react'

import { DOMAIN, name } from 'Config'
import weixin from '@/utils/weixin'

import './style.scss'

@withRouter
class Share extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    comment: PropTypes.object,
    match: PropTypes.object,
    location: PropTypes.object
  }

  static defaultProps = {
    data: {}
  }

  constructor(props) {
    super(props)
    this.state = {
      displayTips: false,
      showQrcode: false
    }
  }

  componentDidMount() {
    const { _s } = this.props.location && this.props.location.params ? this.props.location.params : {}

    if (_s === 'weixin') {
      this.showTips(true)
    }
  }

  goShare = type => {
    const {
      data: { title, desc, pic, url }
    } = this.props
    const enUrl = encodeURIComponent(`${DOMAIN}${url}`)
    const enTitle = encodeURIComponent(title)
    const enPic = encodeURIComponent(pic)
    const enDesc = encodeURIComponent(desc)
    const enName = encodeURIComponent(name)
    const enFrom = encodeURIComponent('来自' + name + ' ' + DOMAIN)
    const site = {
      qq: `https://connect.qq.com/widget/shareqq/index.html?url=${enUrl}&title=${enTitle}&desc=&summary=${enDesc}&pics=${enPic}&site=${enName}`,
      weibo: `http://service.weibo.com/share/share.php?appkey=111884427&url=${enUrl}&title=${enTitle}&pic=${enPic}`,
      qzone: `https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${enUrl}&title=${enTitle}&desc=${enFrom}&summary=${enDesc}&pics=${enPic}&site=${enName}`,
      tieba: `https://tieba.baidu.com/f/commit/share/openShareApi?url=${enUrl}&title=${enTitle}&desc=${enDesc}&comment=1`
    }
    window.open(site[type], '_blank', 'width=770,height=620')
  }

  shareToWeiXin = () => {
    if (weixin.in) {
      this.showTips(true)
    } else {
      this.showQRcode(true)
    }
  }

  showQRcode = bl => {
    this.setState({ showQrcode: bl })
  }

  showTips = bl => {
    this.setState({ displayTips: bl })
  }

  render() {
    const { displayTips, showQrcode } = this.state
    const {
      data: { url }
    } = this.props
    return (
      <Fragment>
        <i styleName="wechat" onClick={this.shareToWeiXin} />
        <i styleName="weibo" onClick={() => this.goShare('weibo')} />
        <i styleName="tieba" onClick={() => this.goShare('tieba')} />
        <i styleName="qzone" onClick={() => this.goShare('qzone')} />
        <i styleName="qq" onClick={() => this.goShare('qq')} />
        <Fragment>
          {showQrcode ? (
            <div
              styleName="mark"
              onClick={e => {
                this.showQRcode(false)
              }}
            />
          ) : null}

          {showQrcode ? (
            <div styleName="qrcode">
              <QRCode value={`${DOMAIN}${url}?_s=weixin`} />
              <div>微信扫一扫，分享</div>
            </div>
          ) : null}

          <div
            styleName="tips-weixin-share"
            style={{ display: displayTips ? 'block' : 'none' }}
            onClick={() => {
              this.showTips(false)
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
}

export default Share
