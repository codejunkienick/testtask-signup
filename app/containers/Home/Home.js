import React, { Component } from 'react';
import applyStyles from 'react-css-modules';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { FlatButton, Snackbar } from 'material-ui';
import styles from './Home.css';

@connect(
)
@applyStyles(styles)
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snackbar: {
        open: false,
        message: '$item added in cart',
        duration: 8000
      },
      openCart: false
    };
  }
  componentWillMount() {
    this.props.loadItems(); 
  }
  
  handleSnackbarRequestClose() {
    this.setState({
      snackbar: {
        ...this.state.snackbar,
        open: false
      }
    });
  }

  openSnackbar(itemName) {
    this.setState({
      snackbar: {
        ...this.state.snackbar,
        open: true,
        message: 'Set ' + itemName + ' was added in cart',
        action: 'Order'
      }
    });
  }

  onAddItem(itemId, name) {
    this.props.addItem(itemId);
    this.openSnackbar(name);
  }

  render() {
    const { snackbar } = this.state;
    return (
      <div styleName="home">
        <Helmet title="Sign up"/>
        <h1>Sign up</h1>
        <Snackbar
          styleName="snackbar"
          open={snackbar.open}
          message={snackbar.message}
          action={snackbar.action}
          autoHideDuration={snackbar.duration}
          onActionTouchTap={() => console.log('unsupported')}
          onRequestClose={() => {this.handleSnackbarRequestClose()}}
        />
      </div>
    );
  }
}
