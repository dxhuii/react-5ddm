import React, { Component } from 'react';

// https://github.com/kodyl/react-document-meta
import DocumentMeta from 'react-document-meta';

export class Meta extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    const { title, description, meta } = this.props
    const metaConfig = {
      title: title,
      description: description || '',
      meta: { ...meta }
    }

    return (
      <DocumentMeta {...metaConfig} />
    )

  }
}

export default Meta;
