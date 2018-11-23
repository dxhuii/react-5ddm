import React, { Component }  from 'react';
import SimpleMDE from 'react-simplemde-editor';
import "simplemde/dist/simplemde.min.css";

export default class SimpleEditor extends Component {

  state = {
    textValue: ''
  }

  handleChange = (editorState) => {
    console.log(editorState)
    this.props.getValue(editorState)
  }

  render () {

    return (
      <SimpleMDE
        id="your-custom-id"
        label="Your label"
        onChange={this.handleChange}
        value={this.state.textValue}
        options={{
          autofocus: true,
          spellChecker: false,
          // etc.
        }}
      />
    )
  }
}
