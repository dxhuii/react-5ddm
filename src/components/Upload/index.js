import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

export default class Main extends Component {
  static propTypes = {
    url: PropTypes.string,
    upload: PropTypes.func,
    uploadEnd: PropTypes.func,
    children: PropTypes.any,
    progress: PropTypes.func,
    fileNum: PropTypes.func
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

  up = (file, index) => {
    const { url, upload } = this.props
    axios.get(url).then(rst => {
      console.log(rst.data, this.props)
      if (upload) {
        upload(rst.data, file, this.upLoadAlioss, index)
        return
      }
      this.upLoadAlioss(Object.assign({}, rst.data, { file }), index)
    })
  }

  setA = num => {
    let a = []
    for (let i = 0; i < num; i++) {
      a.push(i)
    }
    return a
  }

  doUpload = () => {
    console.log(this.input.files)
    const file = this.input.files
    this.props.fileNum(this.setA(file.length))
    this.inputBox.parentNode.removeChild(this.inputBox)
    this.input = null
    this.inputBox = null
    if (file.length > 1) {
      for (let i = 0; i < file.length; i++) {
        this.up(file[i], i)
      }
    } else {
      this.up(file[0], 0)
    }
  }
  upLoadAlioss = (options, index) => {
    const file = options.file
    const fd = new FormData()
    const xhr = new XMLHttpRequest()
    const key = options.dir + new Date().getTime() + '_' + options.file.name

    const progressFn = event => {
      console.log(event)
      this.props.progress((event.loaded / event.total) * 100, index)
    }
    const successFn = res => {
      console.log(res)
      this.props.uploadEnd(options.host + '/' + key)
    }
    const errorFn = res => {
      console.log(res)
      this.props.uploadEnd(false)
    }

    xhr.upload.addEventListener('progress', progressFn, false)
    xhr.addEventListener('load', successFn, false)
    xhr.addEventListener('error', errorFn, false)
    xhr.addEventListener('abort', errorFn, false)
    fd.append('OSSAccessKeyId', options.accessid)
    fd.append('policy', options.policy)
    fd.append('Signature', options.signature)
    fd.append('key', key)
    fd.append('success_action_status', '200')
    fd.append('file', file)
    xhr.open('POST', options.host, true)
    xhr.send(fd)
    console.log(fd, options)
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
