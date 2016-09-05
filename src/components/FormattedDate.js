import React, { Component } from 'react';
import moment from 'moment';

class FormattedDate extends Component {

  render() {
    let time = moment(this.props.date);
    time = time.format('HH:mm DD/MM/YYYY');
    return (
      <span>{time}</span>
    );
  }
};

export default FormattedDate;
