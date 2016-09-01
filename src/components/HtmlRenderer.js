import React, { Component } from 'react';
import {observer} from 'mobx-react';

class HtmlRenderer extends Component {

  createMarkup = () => {
    return {__html: this.props.html}
  };

  render() {
    return (
      <div dangerouslySetInnerHTML={this.createMarkup()}>
      </div>
    );
  }
};

export default HtmlRenderer;
