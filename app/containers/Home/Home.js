import React, { Component } from 'react';
import config from '../../config';
import Helmet from 'react-helmet';
import { Spinner } from 'components';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { StoreItem, CartDialog } from 'components';
import ShoppingCart from 'material-ui/svg-icons/action/shopping-cart'; 
import { FlatButton, Snackbar } from 'material-ui';
import { add as addItem, remove as removeItem, load as loadItems } from 'redux/actions/order';
import CSSModules from 'react-css-modules';
import styles from './Home.css';

@connect(
  state => ({
    order: state.get('order')
  }),
  {addItem, removeItem, loadItems}
)
@CSSModules(styles)
export default class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      snackbar: {
        open: false,
        message: '$item добавлен в корзину',
        duration: 8000
      },
      openCart: false
    }
  }
  componentWillMount() {
    this.props.loadItems(); 
  }

  get cartItems() {
    const { order } = this.props;
    const sheets = order.get('items');
    return order.get('ordered').map((quantity, itemId) => {
      const sheet = sheets.find((sheet) => sheet.id == itemId);
      return {
        ...sheet,
        quantity,
      } 
    }).toArray();
  }

  handleCartClose() {
    this.setState({
      openCart: false 
    });  
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
        message: 'Набор ' + itemName + ' был добавлен в корзину',
        action: 'Заказать'
      }
    })
  }

  onAddItem(itemId, name) {
    this.props.addItem(itemId);
    this.openSnackbar(name);
  }

  openCart() {
    //TODO: On mobile move to other screen/fullscreen overlay. On desktop open popup
    this.setState({openCart: true})
  }

  render() {
    const mapIcon = require('./icons/placeholder.svg');
    const creditIcon = require('./icons/credit-card.svg');
    const lightbulbIcon = require('./icons/light-bulb.svg');
    const { order } = this.props;
    const { openCart } = this.state;

    return (
      <div styleName="home">
        <Helmet title="Home"/>
        <header styleName="header">
          <FlatButton
            label="Корзина"
            backgroundColor="#7782bf"
            hoverColor="#9da8ea"
            rippleColor="#fff"
            labelPosition="after"
            primary={false}
            style={{color: '#fff', position: 'absolute', top: 20, right: 80}}
            styleName="cartBtn" 
            icon={<ShoppingCart />}
            onClick={() => {this.openCart()}}
          />
          <h1 styleName="logo">
            STARTER KIT. <br />
            CODENAME LAPIS
          </h1>
        </header>
        <section styleName="items">
          <div className="container">
            <div className="row">
              { order.get('items') && order.get('items').map((sheet, idx) => {
                return (
                  <div className="col-md-4" key={idx}>
                    <StoreItem 
                      {...sheet} 
                      onAdd={(id, title) => {this.onAddItem(id, title)}} 
                      ordered={(order.get('ordered').has(sheet.id)) ? true : false}/>
                  </div>
                  );
              }) }
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
                className="col-md-4 col-xs-12">
                <h3 styleName="infoBlockTitle">Доставка</h3>
                <img styleName="infoBlockImage" src={mapIcon}/>
                <p styleName="infoBlockText">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>
              </div>
              <div 
                styleName="infoBlock" 
                className="col-md-4 col-xs-12">
                <h3 styleName="infoBlockTitle">Оплата</h3>
                <img styleName="infoBlockImage" src={creditIcon}/>
                <p styleName="infoBlockText">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>
              </div>
              <div
                styleName="infoBlock" 
                className="col-md-4 col-xs-12">
                <h3 styleName="infoBlockTitle">О нас</h3>
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
          <div styleName="developers">Разработано <a href="http://katakana.xyz">katakana.xyz</a></div>
        </footer>
        <Snackbar
          styleName="snackbar"
          open={this.state.snackbar.open}
          message={this.state.snackbar.message}
          action={this.state.snackbar.action}
          autoHideDuration={this.state.snackbar.duration}
          onActionTouchTap={() => {this.openCart()}}
          onRequestClose={() => {this.handleSnackbarRequestClose()}}
        />
        <CartDialog
          open={openCart}
          items={this.cartItems}
          handleClose={() => this.handleCartClose()}
          handleAdd={this.props.addItem}
          handleRemove={this.props.removeItem}
          handleOrder={() => console.log('place order')}
        />

      </div>
    );
  }
}
