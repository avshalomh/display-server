import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';

require('./login.stylus');
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
  console.log("Login.js 1");
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
    let className = 'login-invalid ' + (this.state.invalid ? 'invalid-visible' : '');
    let errors = (
      <div className={className}>Invalid Credentials</div>
    );

    return (
      <div className="login-container">
        <fieldset>
          <legend>Login</legend>
          <div className="login-form">
            <TextField floatingLabelText="User Name" onChange={this.updateUser} defaultValue={this.state.user}/>
            <TextField floatingLabelText="Password" onChange={this.updatePW} type="password"
                       defaultValue={this.state.password}/>
            <RaisedButton primary={true} label="Login" onClick={this.doLogin}/>
            {errors}
          </div>
        </fieldset>
      </div>
    );
  }
}
;

export default Login;
