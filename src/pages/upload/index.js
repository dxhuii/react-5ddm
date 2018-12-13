import React, { Component } from 'react'
import FileUpload from '../../components/Upload'

import './style.scss'
export default class Main extends Component {
  state = {
    imgUlr: [],
    progress_0: 0,
    file: []
  }
  progress = (data, index) => {
    console.log(data)
    this.setState({ [`progress_${index}`]: data })
  }
  render() {
    const { imgUlr, file } = this.state
    return (
      <div style={{ padding: 30, fontSize: 30 }}>
        <FileUpload
          url="http://localhost:4000/sign/alioss"
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
          上传
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
          {imgUlr.map((item, index) => (
            <li key={index}>
              <img src={item} />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
