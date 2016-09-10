import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';

class Login extends Component {
  state = {
    user: '',
    password: ''
  };
  updateUser = (e) => {
    this.state.user = e.target.value;
    this.setState(Object.assign({}, this.state, {invalid: false}));
  };

  updatePW = (e) => {
    this.state.password = e.target.value;
    this.setState(Object.assign({}, this.state, {invalid: false}));
  };
  doLogin = () => {
    axios.post('/doLogin', {
      user: this.state.user,
      password: this.state.password
    }).then(() => {
      window.location = '/';
    }).catch(() => {
      this.setState(Object.assign({}, this.state, {invalid: true}));
    })
  };

	render() {
			return (
				<div>
					<TextField floatingLabelText="User Name" onChange={this.updateUser} defaultValue={this.state.user} />
					<TextField floatingLabelText="Password" onChange={this.updatePW} type="password" defaultValue={this.state.password} />
          <RaisedButton label="Login" onClick={this.doLogin} />
				</div>
			);
	}
};

export default Login;
