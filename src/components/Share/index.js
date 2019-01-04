import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import QRCode from 'qrcode.react'

import { DOMAIN, name } from 'Config'
import weixin from '@/utils/weixin'

// styles
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
    // const { path } = this.props.match
    const { _s } = this.props.location && this.props.location.params ? this.props.location.params : {}

    if (_s === 'weixin') {
      this.showTips(true)
    }
  }

  goShare = type => {
    const {
      data: { title, desc, pic, url }
    } = this.props
    console.log(this.props)
    const enUrl = encodeURIComponent(`${DOMAIN}${url}`)
    const enTitle = encodeURIComponent(title)
    const enPic = encodeURIComponent(pic)
    const enDesc = encodeURIComponent(desc)
    const enName = encodeURIComponent(name)
    const enFrom = encodeURIComponent('来自' + name + ' ' + DOMAIN)
    // iShare_qq          : 'http://connect.qq.com/widget/shareqq/index.html?url={{URL}}&title={{TITLE}}&desc={{DESCRIPTION}}&summary=&pics={{IMAGE}}',
    // iShare_qzone       : 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={{URL}}&title={{TITLE}}&summary={{DESCRIPTION}}&pics={{IMAGE}}&desc=&site=',
    // iShare_tencent     : 'http://share.v.t.qq.com/index.php?c=share&a=index&title={{TITLE}}&url={{URL}}&pic={{IMAGE}}',
    // iShare_weibo       : 'http://service.weibo.com/share/share.php?url={{URL}}&title={{TITLE}}&pic={{IMAGE}}',
    // iShare_douban      : 'http://shuo.douban.com/!service/share?href={{URL}}&name={{TITLE}}&text={{DESCRIPTION}}&image={{IMAGE}}',
    // iShare_renren			 : 'http://widget.renren.com/dialog/share?resourceUrl={{URL}}&title={{TITLE}}&pic={{IMAGE}}&description={{DESCRIPTION}}',
    // iShare_youdaonote  : 'http://note.youdao.com/memory/?title={{TITLE}}&pic={{IMAGE}}&summary={{DESCRIPTION}}&url={{URL}}',
    // iShare_linkedin    : 'http://www.linkedin.com/shareArticle?mini=true&ro=true&title={{TITLE}}&url={{URL}}&summary={{DESCRIPTION}}&armin=armin',
    // iShare_facebook    : 'https://www.facebook.com/sharer/sharer.php?s=100&p[title]={{TITLE}}p[summary]={{DESCRIPTION}}&p[url]={{URL}}&p[images]={{IMAGE}}',
    // iShare_twitter     : 'https://twitter.com/intent/tweet?text={{TITLE}}&url={{URL}}',
    // iShare_googleplus  : 'https://plus.google.com/share?url={{URL}}&t={{TITLE}}',
    // iShare_pinterest	 : 'https://www.pinterest.com/pin/create/button/?url={{URL}}&description={{DESCRIPTION}}&media={{IMAGE}}',
    // iShare_tumblr			 : 'https://www.tumblr.com/widgets/share/tool?shareSource=legacy&canonicalUrl=&url={{URL}}&title={{TITLE}}'
    const site = {
      qq: `https://connect.qq.com/widget/shareqq/index.html?url=${enUrl}&title=${enTitle}&desc=&summary=${enDesc}&pics=${enPic}&site=${enName}`,
      weibo: `http://service.weibo.com/share/share.php?appkey=111884427&url=${enUrl}&title=${enTitle}&pic=${enPic}`,
      qzone: `https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${enUrl}&title=${enTitle}&desc=${enFrom}&summary=${enDesc}&pics=${enPic}&site=${enName}`,
      // twitter: `https://twitter.com/share?url=${enUrl}&text=${enTitle}`,
      // facebook: `https://www.facebook.com/sharer/sharer.php?u=${enUrl}&t=${enTitle}`,
      tieba: `https://tieba.baidu.com/f/commit/share/openShareApi?url=${enUrl}&title=${enTitle}&desc=${enDesc}&comment=1`
      // douban: ``
    }
    const size = {
      qq: 'width=770,height=620',
      weibo: 'width=550,height=370',
      qzone: 'width=590,height=370',
      // twitter: 'width=550,height=370',
      // facebook: 'width=770,height=620',
      tieba: 'width=770,height=620'
      // douban: 'width=770,height=620'
    }
    window.open(site[type], '_blank', size[type])
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
    console.log(this.props, 'share')
    const { displayTips, showQrcode } = this.state
    const {
      data: { url }
    } = this.props
    return (
      <Fragment>
        <div styleName="icon-box">
          <i styleName="wechat" onClick={this.shareToWeiXin} />
          <i styleName="weibo" onClick={() => this.goShare('weibo')} />
          <i styleName="tieba" onClick={() => this.goShare('tieba')} />
          <i styleName="qzone" onClick={() => this.goShare('qzone')} />
          <i styleName="qq" onClick={() => this.goShare('qq')} />
          {/* <i styleName="twitter" onClick={() => this.goShare('twitter')} />
          <i styleName="facebook" onClick={() => this.goShare('facebook')} /> */}
        </div>
        <div>
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
        </div>
      </Fragment>
    )
  }
}

export default Share
