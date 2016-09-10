// @flow 
import React, { Component } from 'react';
import applyStyles from 'react-css-modules';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { RaisedButton, Paper, TextField } from 'material-ui';
import { signup } from 'redux/actions/form';
import { push } from 'react-router-redux';
import  * as Events from 'utils/events';
import styles from './Home.css';
import * as validators from 'utils/validation';

declare var socket: Object;

type Props = {  
  signup: () => void;
  fail: () => void;
  success: () => void;
  push: (route: string) => void;
  apiError: string;
  signedUp: boolean;
}


@connect(
  state => { return { 
    apiError: state.get('form').get('error'),
    signedUp: state.get('form').get('signedUp')
  } },
  { signup: signup.request, fail: signup.failure, success: signup.success, push }
)
@applyStyles(styles)
export default class Home extends Component {
  state: {
    nicknameError: string;
    emailError: string;
    phoneError: string;
    passwordError: string;
    password2Error: string;

    nicknameInput: string;
    emailInput: string;
    phoneInput: string;
    passwordInput: string;
    password2Input: string;
  };
  props: Props;
  constructor(props: Props) {
    super(props);
    this.state = {
      nicknameError: '',
      phoneError: '',
      emailError: '',
      passwordError: '',
      password2Error: '',

      nicknameInput: '',
      phoneInput: '',
      emailInput: '',
      passwordInput: '',
      password2Input: '',
    };
  }

  componentDidMount() {
    socket.on('signup.error', (error) => { this.props.fail(error.message) });
    socket.on('signup.success', () => { this.props.success() });
  }

  componentWillReceiveProps(nextProps: Props) {
    console.log(nextProps);
    const { signedUp } = this.props;
    if (!signedUp && nextProps.signedUp) {
      console.log('signedUp');
      this.props.push('/signedup');
    }
  }

  handleNicknameChange(event: Event) { 
    this.setState({nicknameInput: Events.target(event, HTMLInputElement).value, nicknameError: ''}); 
  }
  handleEmailChange(event: Event) { 
    this.setState({emailInput: Events.target(event, HTMLInputElement).value, emailError: ''}); 
  }
  handlePhoneChange(event: Event) { 
    this.setState({phoneInput: Events.target(event, HTMLInputElement).value, phoneError: ''}); 
  }
  handlePasswordChange(event: Event) { 
    this.setState({passwordInput: Events.target(event, HTMLInputElement).value, passwordError: ''}); 
  }
  handlePassword2Change(event: Event) { 
    this.setState({password2Input: Events.target(event, HTMLInputElement).value, password2Error: ''}); 
  }
  handleSubmit() {
    const { 
      nicknameInput, 
      phoneInput,
      emailInput,
      passwordInput,
      password2Input
    } = this.state;

    const errors = {
      nicknameError: validators.required(nicknameInput),
      phoneError: validators.required(phoneInput),
      emailError: validators.required(emailInput),
      passwordError: validators.required(passwordInput) || validators.password(passwordInput, password2Input),
      password2Error: validators.required(password2Input) || validators.password(passwordInput, password2Input),
    };

    for (let error of Object.values(errors)) {
      if (error) { return this.setState(errors) }
    }
    
    this.props.signup();
    socket.emit('signup', {email: emailInput, phone: phoneInput, nickname: nicknameInput, password: passwordInput});
  }
  

  render() {
    const {
      phoneError,
      nicknameError,
      emailError,
      passwordError,
      password2Error,

      phoneInput,
      nicknameInput,
      emailInput,
      passwordInput,
      password2Input
    } = this.state;
    const { apiError } = this.props;
    return (
      <div styleName="signup">
        <Helmet title="Sign up form"/>
          <Paper>
            <div styleName="form">
            <h1>Sign up</h1>
            { apiError && <span>SOCKET ERROR: {apiError}</span> }
            <div styleName="signup-row">
              <TextField
                hintText="nickname"
                floatingLabelText="Type in your nickname"
                onChange={this.handleNicknameChange.bind(this)}
                value={nicknameInput}
                errorText={nicknameError}
              />
            </div>
            <div styleName="signup-row">
              <TextField
                hintText="email"
                floatingLabelText="Type in your email"
                value={emailInput}
                errorText={emailError}
                onChange={this.handleEmailChange.bind(this)}
              />
              <TextField
                hintText="phone"
                floatingLabelText="Type in your phone number"
                value={phoneInput}
                errorText={phoneError}
                onChange={this.handlePhoneChange.bind(this)}
              />
            </div>
            <div styleName="signup-row">
              <TextField
                hintText="Password"
                type="password"
                floatingLabelText="Type in your password"
                value={passwordInput}
                errorText={passwordError}
                onChange={this.handlePasswordChange.bind(this)}
              />
              <TextField
                hintText="Password repeat"
                type="password"
                floatingLabelText="Type in your password again"
                errorText={password2Error}
                value={password2Input}
                onChange={this.handlePassword2Change.bind(this)}
              />
            </div>
            <div styleName="btn-wrapper">
              <RaisedButton styleName="btn" label="Signup" primary={true} onTouchTap={this.handleSubmit.bind(this)} /> 
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}
