// @flow 
import React, { Component } from 'react';
import applyStyles from 'react-css-modules';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { RaisedButton, Snackbar, Paper, TextField } from 'material-ui';
import { signup } from 'redux/actions/form';
import  * as Events from 'utils/events';
import styles from './Home.css';

declare var socket: Object;

type Props = {  
  signup: () => void;
  fail: () => void;
  success: () => void;
}


@connect(
  state => { return { form: state.get('form') } },
  { signup: signup.request, fail: signup.failure, success: signup.success }
)
@applyStyles(styles)
export default class Home extends Component {
  state: {
    snackbar: {
      open: boolean;
      message: string;
      duration: number;
    };
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
      snackbar: {
        open: false,
        message: '',
        duration: 8000
      },
      nicknameInput: '',
      phoneInput: '',
      emailInput: '',
      passwordInput: '',
      password2Input: '',
    };
  }

  componentDidMount() {
    socket.on('signup.error', (error) => { this.props.fail(error) });
    socket.on('signup.success', () => { this.props.success() });
  }

  handleNicknameChange(event: Event) { this.setState({nicknameInput: Events.target(event, HTMLInputElement).value}); }
  handleEmailChange(event: Event) { this.setState({emailInput: Events.target(event, HTMLInputElement).value}); }
  handlePhoneChange(event: Event) { this.setState({phoneInput: Events.target(event, HTMLInputElement).value}); }
  handlePasswordChange(event: Event) { this.setState({passwordInput: Events.target(event, HTMLInputElement).value}); }
  handlePassword2Change(event: Event) { this.setState({password2Input: Events.target(event, HTMLInputElement).value}); }
  handleSubmit() {
    const { 
      nicknameInput, 
      phoneInput,
      emailInput,
      passwordInput,
      password2Input
    } = this.state;
    this.props.signup();
    socket.emit('signup', {email: emailInput, phone: phoneInput, nickname: nicknameInput, password: passwordInput});
  }
  
  componentWillMount() {
  }
  
  handleSnackbarRequestClose() {
    this.setState({
      snackbar: {
        ...this.state.snackbar,
        open: false
      }
    });
  }

  openSnackbar(message: string) {
    this.setState({
      snackbar: {
        ...this.state.snackbar,
        message,
        open: true,
      }
    });
  }

  render() {
    const {
      snackbar,
      phoneInput,
      nicknameInput,
      emailInput,
      passwordInput,
      password2Input
    } = this.state;
    return (
      <div styleName="signup">
        <Helmet title="Sign up form"/>
          <Paper>
            <div styleName="form">
            <h1>Sign up</h1>
            <div styleName="signup-row">
              <TextField
                hintText="nickname"
                floatingLabelText="Type in your nickname"
                onChange={this.handleNicknameChange.bind(this)}
                value={nicknameInput}
              />
            </div>
            <div styleName="signup-row">
              <TextField
                hintText="email"
                floatingLabelText="Type in your email"
                value={emailInput}
                onChange={this.handleEmailChange.bind(this)}
              />
              <TextField
                hintText="phone"
                floatingLabelText="Type in your phone number"
                value={phoneInput}
                onChange={this.handlePhoneChange.bind(this)}
              />
            </div>
            <div styleName="signup-row">
              <TextField
                hintText="Password"
                type="password"
                floatingLabelText="Type in your password"
                value={passwordInput}
                onChange={this.handlePasswordChange.bind(this)}
              />
              <TextField
                hintText="Password repeat"
                type="password"
                floatingLabelText="Type in your password again"
                value={password2Input}
                onChange={this.handlePassword2Change.bind(this)}
              />
            </div>
            <div styleName="btn-wrapper">
              <RaisedButton styleName="btn" label="Signup" primary={true} onTouchTap={this.handleSubmit.bind(this)} /> 
            </div>
          </div>
        </Paper>
        <Snackbar
          styleName="snackbar"
          open={snackbar.open}
          message={snackbar.message}
          autoHideDuration={snackbar.duration}
          onRequestClose={() => {this.handleSnackbarRequestClose()}}
        />
      </div>
    );
  }
}
