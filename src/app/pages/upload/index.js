import React, { Component } from 'react'
import FileUpload from '../../components/Upload'
import Tooltip from '../../components/Tooltip'
import { publicPath } from 'Config'

import Modal from '@/components/Modal'
import Sign from '@/components/Sign'

import './style.scss'
export default class Main extends Component {
  state = {
    imgUlr: [],
    progress_0: 0,
    file: [],
    visible: false,
    type: 'signIn'
  }
  progress = (data, index) => {
    console.log(data)
    this.setState({ [`progress_${index}`]: data })
  }
  showModal = type => {
    this.setState({
      type,
      visible: true
    })
  }

  closeModal = () => {
    this.setState({
      visible: false
    })
  }
  render() {
    const { imgUlr, file, type, visible } = this.state
    return (
      <div style={{ padding: 30, fontSize: 30 }}>
        <FileUpload
          url={`${publicPath}/sign/alioss`}
          uploadEnd={data => {
            this.setState({
              imgUlr: this.state.imgUlr.concat(data)
            })
          }}
          upload={(data, file, load, index) => {
            load(Object.assign({}, data, { file }), index)
          }}
          progress={(data, index) => this.progress(data, index)}
          fileNum={data => this.setState({ file: data })}
        >
          <Tooltip text="你好你好你好你好你好你好">上传</Tooltip>
        </FileUpload>
        <ul styleName="img-list">
          {file.length > 0
            ? file.map(item => (
                <div key={item} styleName="progress" style={{ width: `${this.state[`progress_${item}`]}%` }}>
                  {this.state[`progress_${item}`]}
                </div>
              ))
            : null}
          {(console.log(this.state), file)}
          <Tooltip text="你好你好你好你好你好你好你好你好你好你好">
            <h3>1111</h3>
          </Tooltip>
          {imgUlr.map((item, index) => (
            <li key={index}>
              <img src={item} />
            </li>
          ))}
        </ul>
        <a onClick={() => this.showModal('signIn')}>登录</a>
        <a onClick={() => this.showModal('signUp')}>注册</a>
        <Modal visible={visible} showModal={this.showModal} closeModal={this.closeModal}>
          <Sign type={type} />
        </Modal>
      </div>
    )
  }
}
