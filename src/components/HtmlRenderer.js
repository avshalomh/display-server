import React, { Component } from 'react';

require('../styles/full-screen-iframe.css');

class HtmlRenderer extends Component {


  componentDidMount = () => {
    this.updateIframe();
  };

  updateIframe() {
    var iframe = this.refs.iframe;
    iframe.contentDocument.open();
    iframe.contentDocument.write(this.props.html);
    iframe.contentDocument.close();
  }
  componentDidUpdate = () => {
    this.updateIframe();
  };

  render() {
    return (
      <iframe className="full-screen-iframe" ref="iframe" ></iframe>
    );
  }
};

export default HtmlRenderer;
