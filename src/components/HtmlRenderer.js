import React, { Component } from 'react';

class HtmlRenderer extends Component {

  constructor(props) {
    console.log(props);
    super(props);
  }

  render() {
    return (
      <div ref="htmlContainer">
      </div>
    );
  }

  shouldComponentUpdate = (nextProps) => {
    return nextProps.html !== this.props.html;
  };

  componentDidUpdate = () => {
    this.refs.htmlContainer.innerHTML = this.props.html;
  }
};

export default HtmlRenderer;
