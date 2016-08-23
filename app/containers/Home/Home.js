import React, { Component } from 'react';
import applyStyles from 'react-css-modules';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import ShoppingCart from 'material-ui/svg-icons/action/shopping-cart'; 
import { FlatButton, Snackbar } from 'material-ui';
import styles from './Home.css';
import { StoreItem } from 'components';
import { add as addItem, load as loadItems } from 'redux/actions/order';

@connect(
  state => ({
    order: state.get('order')
  }),
  { addItem, loadItems }
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
    const mapIcon = require('./icons/placeholder.svg');
    const creditIcon = require('./icons/credit-card.svg');
    const lightbulbIcon = require('./icons/light-bulb.svg');
    const { order } = this.props;

    return (
      <div styleName="home">
        <Helmet title="Home"/>
        <section styleName="items">
          <div className="container">
            <div className="row">
              {order.get('items') && order.get('items').map((sheet, idx) => 
                  <div className="col-md-4" key={idx}>
                    <StoreItem 
                      {...sheet} 
                      onAdd={(id, title) => { this.onAddItem(id, title) }} 
                      ordered={(order.get('ordered').has(sheet.id)) ? true : false}
                    />
                  </div>
              )}
            </div>
          </div>
        </section>
        <section styleName="quote">
          <div className="container">
            <blockquote styleName="quoteText">
              <span styleName="quoteMarkLeft" />
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              <span styleName="quoteMarkRight" />
            </blockquote>
            <span styleName="quoteAuthor">
              Lorem Ipsum 
            </span>
          </div>
        </section>
        <section styleName="info">
          <div className="container">
            <div className="row">
              <div 
                styleName="infoBlock" 
                className="col-md-4 col-xs-12"
              >
                <h3 styleName="infoBlockTitle">Title 1</h3>
                <img styleName="infoBlockImage" src={mapIcon}/>
                <p styleName="infoBlockText">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>
              </div>
              <div 
                styleName="infoBlock" 
                className="col-md-4 col-xs-12"
              >
                <h3 styleName="infoBlockTitle">Title 1</h3>
                <img styleName="infoBlockImage" src={creditIcon}/>
                <p styleName="infoBlockText">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>
              </div>
              <div 
                styleName="infoBlock" 
                className="col-md-4 col-xs-12"
              >
                <h3 styleName="infoBlockTitle">Title 3</h3>
                <img styleName="infoBlockImage" src={lightbulbIcon}/>
                <p styleName="infoBlockText">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>
              </div>
            </div>
          </div>
        </section>
        <footer styleName="footer">
          <div styleName="copyright">2016 &copy; localhost</div>
          <div styleName="developers">Developed by <a href="http://katakana.xyz">katakana.xyz</a></div>
        </footer>
        <Snackbar
          styleName="snackbar"
          open={this.state.snackbar.open}
          message={this.state.snackbar.message}
          action={this.state.snackbar.action}
          autoHideDuration={this.state.snackbar.duration}
          onActionTouchTap={() => console.log('unsupported')}
          onRequestClose={() => {this.handleSnackbarRequestClose()}}
        />

      </div>
    );
  }
}
