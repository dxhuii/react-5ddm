import React from 'react'
import FileUpload from '../../components/Upload'

export default class Main extends React.Component {
  state = {
    imgUlr: []
  }
  render() {
    const { imgUlr } = this.state
    return (
      <div style={{ padding: 30, fontSize: 30 }}>
        <FileUpload
          url="http://localhost:4000/sign/alioss"
          uploadEnd={data => {
            this.setState({
              imgUlr: this.state.imgUlr.concat(data)
            })
          }}
          upload={(data, file, load) => {
            load(Object.assign({}, data, { file }))
          }}
        >
          上传
        </FileUpload>
        <div>
          {imgUlr.map((item, index) => (
            <img key={index} src={item} />
          ))}
        </div>
      </div>
    )
  }
}
