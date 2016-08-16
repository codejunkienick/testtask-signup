import React, { Component } from 'react';
import config from '../../config';
import Helmet from 'react-helmet';
import { Spinner } from 'components';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { StoreItem, CartDialog } from 'components';
import ShoppingCart from 'material-ui/svg-icons/action/shopping-cart'; 
import { FlatButton, Snackbar } from 'material-ui';
import { sheets } from 'db';
import { add as addItem, load as loadItems } from 'redux/actions/order';

@connect(
  state => ({
    order: state.get('order')
  }),
  {addItem, loadItems}
)
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
    return order.map((quantity, itemId) => {
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
    const styles = require('./Home.scss');
    const mapIcon = require('./icons/placeholder.svg');
    const creditIcon = require('./icons/credit-card.svg');
    const lightbulbIcon = require('./icons/light-bulb.svg');
    const { order } = this.props;
    const { openCart } = this.state;

    return (
      <div className={styles.home}>
        <Helmet title="Home"/>
        <header className={styles.header}>
          <FlatButton
            label="Корзина"
            backgroundColor="#7782bf"
            hoverColor="#9da8ea"
            rippleColor="#fff"
            labelPosition="after"
            primary={false}
            style={{color: '#fff', position: 'absolute', top: 20, right: 80}}
            className={styles.cartBtn + ' btn'}
            icon={<ShoppingCart />}
            onClick={() => {this.openCart()}}
          />
          <h1 className={styles.logo}>
            STARTER KIT. <br />
            CODENAME LAPIS
          </h1>
        </header>
        <section className={styles.items}>
          <div className="container">
            <div className="row">
              { sheets.map((sheet, idx) => {
                return (
                  <div className="col-md-4" key={idx}>
                    <StoreItem 
                      {...sheet} 
                      onAdd={(id, title) => {this.onAddItem(id, title)}} 
                      ordered={(order.has(sheet.id)) ? true : false}/>
                  </div>
                  );
              }) }
            </div>
          </div>
        </section>
        <section className={styles.quote}>
          <div className="container">
            <blockquote className={styles.quoteText}>
              <span className={styles.quoteMarkLeft} />
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              <span className={styles.quoteMarkRight} />
            </blockquote>
            <span className={styles.quoteAuthor}>
              Lorem Ipsum 
            </span>
          </div>
        </section>
        <section className={styles.info}>
          <div className="container">
            <div className="row">
              <div className={styles.infoBlock + ' col-md-4 col-xs-12'}>
                <h3 className={styles.infoBlockTitle}>Доставка</h3>
                <img className={styles.infoBlockImage} src={mapIcon}/>
                <p className={styles.infoBlockText}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>
              </div>
              <div className={styles.infoBlock + ' col-md-4 col-xs-12'}>
                <h3 className={styles.infoBlockTitle}>Оплата</h3>
                <img className={styles.infoBlockImage} src={creditIcon}/>
                <p className={styles.infoBlockText}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>
              </div>
              <div className={styles.infoBlock + ' col-md-4 col-xs-12'}>
                <h3 className={styles.infoBlockTitle}>О нас</h3>
                <img className={styles.infoBlockImage} src={lightbulbIcon}/>
                <p className={styles.infoBlockText}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>
              </div>
            </div>
          </div>
        </section>
        <footer className={styles.footer}>
          <div className={styles.copyright}>2016 &copy; localhost</div>
          <div className={styles.developers}>Разработано <a href="http://katakana.xyz">katakana.xyz</a></div>
        </footer>
        <Snackbar
          className={styles.snackbar}
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
          handleOrder={() => console.log('place order')}
        />

      </div>
    );
  }
}
