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
import styles from './App.css';
import config from '../../config';

// Needed for onTouchTap
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

@connect(
  state => ({
    state: state
  }),
  { pushState: push }
)
@applyStyles(styles)
class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    pushState: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.loadFonts();
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
    return (
      <div styleName="app">
        <Helmet {...config.app.head} />
        <div styleName="appContent">
          {this.props.children}
        </div>
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
