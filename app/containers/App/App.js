import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import applyStyles from 'react-css-modules';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import { push } from 'react-router-redux';
import { AppBar, IconButton, Drawer } from 'material-ui';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import ShoppingCart from 'material-ui/svg-icons/action/shopping-cart';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import FontFaceObserver from 'fontfaceobserver';
import { add as addItem, remove as removeItem, load as loadItems } from 'redux/actions/order';
import { StoreItem, CartDialog } from 'components';
import styles from './App.css';
import config from '../../config';

// Needed for onTouchTap
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

const AppBarIcon = () => <NavigationMenu style={{ fill: 'rgb(150, 149, 149)' }} />;
const AppBarCartIcon = () => <ShoppingCart style={{ fill: 'rgb(150, 149, 149)', color: 'rgb(150, 149, 149)' }} />;


@connect(
  state => ({
    order: state.get('order')
  }),
  { addItem, removeItem, loadItems, pushState: push }
)
@applyStyles(styles)
class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    pushState: PropTypes.func.isRequired,
    addItem: PropTypes.func.isRequired,
    loadItems: PropTypes.func.isRequired,
    order: ImmutablePropTypes.map
  };

  constructor(props) {
    super(props);
    this.state = {
      openDrawer: false,
      loading: true,
      openCart: false
    };
  }

  componentWillMount() {
    window.addEventListener('resize', this.draw);
    this.setState({
      windowWidth: window.innerWidth,
      loading: false,
    });
    this.loadFonts();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.draw);
  }

  handleCartClose() {
    this.setState({
      openCart: false 
    });  
  }

  openCart() {
    this.setState({ openCart: true });
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

  draw = () => {
    this.setState({
      windowWidth: window.innerWidth,
    });
  }

  // Observe loading and set proper styles when fonts have loaded
  // Fonts are added inside global.css
  loadFonts() {
    const roboto = new FontFaceObserver('Roboto');
    const robotoCondensed = new FontFaceObserver('Roboto Condensed');

    Promise.all([roboto.load(), robotoCondensed.load()]).then(() => {
      document.body.className += ' fonts-loaded';
    });
  }

  render() {
    const { openCart } = this.state;
    const appBarStyles = {
      backgroundColor: '#fefffa',
      borderBottom: '3px solid #e2e4e0'
    };
    const appBarTitleStyles = {
      fontFamily: 'Roboto Condensed, Helvetica, sans-serif',
      color: '#666'
    };
    const NavLink = (props) => {
      return (
        <Link activeClassName={styles.activeDrawerLink} to={props.to} onClick={() => {
          this.setState({openDrawer: (this.state.windowWidth < 1024) ? false : true});
          this.props.pushState(props.to);
        }}>{props.text}</Link>
      );
    }
    return (
      <div
        style={{ height: '100%' }}
        styleName="app"
      >
        <Helmet {...config.app.head} />
        <AppBar
          zDepth={0}
          style={appBarStyles}
          title={
            <div style={appBarTitleStyles}>Starter Kit. Codename: Lapis</div>
          }
          iconElementLeft={<IconButton onTouchTap={() => this.setState({ openDrawer: !this.state.openDrawer })}><AppBarIcon /></IconButton>}
          iconElementRight={<IconButton onTouchTap={() => this.setState({ openCart: !this.state.openCart })}><AppBarCartIcon /></IconButton>}
        />
        <Drawer
          docked={false}
          width={(this.state.windowWidth > 1024) ? 400 : 300}
          open={this.state.openDrawer}
          zDepth={0}
          containerStyle={{
            backgroundColor: '#fefffa',
            fontFamily: 'Roboto Condensed'
          }}
          containerClassName={styles.drawer}
          onRequestChange={(open) => this.setState({ openDrawer: open })}
        >
          <div styleName="drawerContent">
            <h1 styleName="drawerLogo">
              STARTER KIT. <br />
              CODENAME: LAPIS
            </h1>
            <ul styleName="nav">
              <li><NavLink to="/home" text="Home" /></li>
              <li><NavLink to="/Todo" text="Todo" /></li>
            </ul>
            <div styleName="drawerFooter">
              <a href="http://github.com/codejunkienick/starter-lapis">Source Code</a>
            </div>
          </div>
        </Drawer>
        <div styleName="appContent">
          {this.props.children}
        </div>
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

export default function AppWrapper(props) {
  return (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <div>
        <App {...props} />
      </div>
    </MuiThemeProvider>
  );
}
