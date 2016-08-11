import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import { push } from 'react-router-redux';
import config from '../../config';
import { Drawer, AppBar, IconButton, CircularProgress } from 'material-ui';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

@connect(
  state => ({}),
  {pushState: push})
class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    pushState: PropTypes.func.isRequired
  };

  shouldOpenDrawer(windowWidth) {
    return windowWidth > 1024;
  }

  constructor(props) {
    super(props);
    this.state = {
      openDrawer: false,
      loading: true,
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.draw);
    this.setState({
      windowWidth: window.innerWidth,
      openDrawer: this.shouldOpenDrawer(window.innerWidth),
      loading: false,
    })
    this.loadFonts();
  }

  componentWillUnmount(){
    window.removeEventListener('resize', this.draw);
  }
  
  //Observe loading and set proper styles when fonts have loaded
  //Fonts are added inside global.scss
  loadFonts() {
    const FontFaceObserver = require('fontfaceobserver');
    const roboto = new FontFaceObserver('Roboto');
    const robotoCondensed = new FontFaceObserver('Roboto Condensed');

    Promise.all([roboto.load(), robotoCondensed.load()]).then(() => {
      document.body.className += ' fonts-loaded';
    });
  }

  draw = () => {
    this.setState({
      windowWidth: window.innerWidth,
      openDrawer: this.shouldOpenDrawer(window.innerWidth)
    })
  }

  render() {
    const {user} = this.props;
    const styles = require('./App.scss');

    const NavLink = (props) => {
      return (
        <Link activeClassName={styles.activeDrawerLink} to={props.to} onClick={() => {
          this.setState({openDrawer: (this.state.windowWidth < 1024) ? false : true});
          this.props.pushState(props.to);
        }}>{props.text}</Link>
      );
    }

    const AppBarIcon = () => {
       return <NavigationMenu style={{fill: 'rgb(150, 149, 149)'}} />;
    }
    const AppBarTitle = () => {
      return (
        <div style={{display: 'flex', height: 'inherit'}}>
          Starter Kit Lapis
        </div>
      );
    }

    const appBarStyles = () => {
      if (this.state.windowWidth > 1024) {
        return {
          display: 'none'
        }
      } else {
        return {
          backgroundColor: '#fefffa',
          borderBottom: '3px solid #e2e4e0'
        }
      }
    }

    return (
      <div
        style={{height: '100%'}}
        className={(this.state.fontsLoaded) ? styles.app + ' ' + styles.fontsLoaded : styles.app}>
          <Helmet {...config.app.head}/>
          <AppBar
            zDepth={0}
            style={appBarStyles()}
            title={<AppBarTitle />}
            iconElementLeft={<IconButton onTouchTap={(e) => this.setState({openDrawer: !this.state.openDrawer})}><AppBarIcon /></IconButton>}
          />
          <div className={styles.appContent}>
            {this.props.children}
          </div>
        </div>
    );
  }
}

// Обертка для того, чтобы использовать material-ui и кастомные темы для material-ui
export default class AppWrapper extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
          <App {...this.props}/>
        </div>
      </MuiThemeProvider>
    );
  }
}