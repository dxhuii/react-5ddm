import React, { Component } from 'react'

export class Hot extends Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
  }

  picHttps(pic){
    return pic.replace('http://', '//').replace('https://', '//');
  }

  render() {

    return(
      <div>
        hot
      </div>
    )
  }
}

export default Hot
