import 'braft-editor/dist/index.css'
import React, { Component } from 'react'
import BraftEditor from 'braft-editor'

export default class Editor extends Component {

  state = {
    value: localStorage.getItem(`editor_${this.props.id}`) || ''
  }

  handleChange = (editorState) => {
    const { id } = this.props
    localStorage[`editor_${id}`] = editorState.toHTML()
    // console.log(localStorage[`editor_${id}`])
  }

  render () {

    const controls = [ 'bold', 'italic', 'underline', 'strike-through', 'text-color', 'separator', 'link', 'separator', 'media' ]

    return (
      <BraftEditor
        onChange={this.handleChange}
        controls={controls}
        contentStyle={{ height: 200, boxShadow: 'inset 0 1px 3px rgba(0,0,0,.1)'}}
      />
    )
  }
}
