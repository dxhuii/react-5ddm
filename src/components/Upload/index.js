import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

export default class Main extends Component {
  static propTypes = {
    url: PropTypes.string,
    upload: PropTypes.func,
    uploadEnd: PropTypes.func,
    children: PropTypes.any
  }

  clickUpload = () => {
    let input = document.createElement('input')
    let inputBox = document.createElement('div')
    input.setAttribute('type', 'file')
    input.setAttribute('multiple', 'multiple')
    input.onchange = e => {
      this.doUpload()
    }
    inputBox.style.height = 0
    inputBox.style.overflow = 'hidden'
    inputBox.appendChild(input)
    document.body.appendChild(inputBox)
    this.input = input
    this.inputBox = inputBox
    input.click()
  }
  doUpload = () => {
    const file = this.input.files[0]
    const { url, upload } = this.props
    this.inputBox.parentNode.removeChild(this.inputBox)
    this.input = null
    this.inputBox = null
    axios.get(url).then(rst => {
      console.log(rst.data, this.props)
      if (upload) {
        upload(rst.data, file, this.upLoadAlioss)
        return
      }
      this.upLoadAlioss(Object.assign({}, rst.data, { file }))
    })
  }
  upLoadAlioss = options => {
    const file = options.file
    let curDate = new FormData()
    const key = options.dir + new Date().getTime() + '_' + options.file.name
    curDate.append('OSSAccessKeyId', options.accessid)
    curDate.append('policy', options.policy)
    curDate.append('Signature', options.signature)
    curDate.append('key', key)
    curDate.append('success_action_status', '200')
    curDate.append('file', file)
    console.log(curDate, options)
    return axios({
      url: options.host,
      method: 'post',
      data: curDate
    })
      .then(() => {
        this.props.uploadEnd(options.host + '/' + key)
      })
      .catch(err => {
        this.props.uploadEnd(false)
      })
  }

  render() {
    const { children } = this.props
    return (
      <div className="react-alioss-upload-box">
        <div onClick={this.clickUpload}>{children}</div>
      </div>
    )
  }
}
