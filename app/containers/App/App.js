import React, { Component, PropTypes } from 'react';
import applyStyles from 'react-css-modules';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import { push } from 'react-router-redux';
import { AppBar, IconButton, Tab, Tabs } from 'material-ui';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
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

const AppBarIcon = () => <NavigationMenu style={{ fill: 'rgb(150, 149, 149)' }} />;
const AppBarTitle = () =>
  <div style={{ display: 'flex', height: 'inherit' }}>
    Starter Kit Lapis
  </div>;

@connect(
  state => ({ router: state.get('router') }),
  { pushState: push })
@applyStyles(styles)
class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    pushState: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      openDrawer: false,
      loading: true,
    };
  }

  componentWillMount() {
    window.addEventListener('resize', this.draw);
    this.setState({
      windowWidth: window.innerWidth,
      openDrawer: this.shouldOpenDrawer(window.innerWidth),
      loading: false,
    });
    this.loadFonts();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.draw);
  }

  shouldOpenDrawer(windowWidth) {
    return windowWidth > 1024;
  }
  draw = () => {
    this.setState({
      windowWidth: window.innerWidth,
      openDrawer: this.shouldOpenDrawer(window.innerWidth)
    });
  }
  appBarStyles = () => {
    if (this.state.windowWidth > 1024) return { display: 'none' };
    return {
      backgroundColor: '#fefffa',
      borderBottom: '3px solid #e2e4e0'
    };
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

  handleTab(tab) {
    this.props.pushState(tab.props['data-route']);
  }

  render() {
    return (
      <div
        style={{ height: '100%' }}
        styleName="app"
      >
        <Helmet {...config.app.head} />
        <AppBar
          zDepth={0}
          style={this.appBarStyles()}
          title={<AppBarTitle />}
          iconElementLeft={<IconButton onTouchTap={() => this.setState({ openDrawer: !this.state.openDrawer })}><AppBarIcon /></IconButton>}
        />
        <Tabs>
          <Tab
            label="Home"
            data-route="/"
            onActive={(tab) => { this.handleTab(tab); }}
          />
          <Tab
            label="Todo"
            data-route="/todo"
            onActive={(tab) => { this.handleTab(tab); }}
          />
        </Tabs>
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
