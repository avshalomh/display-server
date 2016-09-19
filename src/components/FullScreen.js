import React, { Component } from 'react';
require('../styles/client/full-screen.stylus');
class FullScreen extends Component {

  state = {
    inFullScreen: false
  };

  updateFullScreenState = () => {

    this.setState({inFullScreen: document.webkitIsFullScreen});
  };

  monitorScreenState = () => {
    //fucking shit, can't set it without checking all the time...
    setTimeout(() => {
      this.updateFullScreenState();
      this.monitorScreenState();
    }, 500);
  };

  componentDidMount = () => {
    this.updateFullScreenState();
    this.monitorScreenState();
  };

  toggleFullScreen = () => {
    document.documentElement.webkitRequestFullscreen();
  };

  render() {
    if (this.state.inFullScreen) {
      return null;
    } else {
      return (
        <div onClick={this.toggleFullScreen} className="full-screen-container"></div>
      )
    }
  }
}

export default FullScreen;
