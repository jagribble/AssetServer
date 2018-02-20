// src/routes.js

import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import { Router } from 'react-router';
import { Route, BrowserRouter } from 'react-router-dom';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import createBrowserHistory from 'history/createBrowserHistory';
import Template from './Template';
import Home from './home';
import DataWizard from './DataWizard';
import AssetData from './AssetData';
import Users from './Users';
// import Callback from './Auth/callback';
// import Auth from './Auth/Auth';
// import history from './Auth/history';

// const auth = new Auth();

// const handleAuthentication = (nextState, replace) => {
//   if (/access_token|id_token|error/.test(nextState.location.hash)) {
//     auth.handleAuthentication();
//   }
// };

const history = createBrowserHistory();

const goHome = () => {
  console.log('history');
  history.push('/');
  history.go();
};


export default class MainRoutes extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.direct = this.direct.bind(this);
  }

  componentWillMount() {
    injectTapEventPlugin();
  }

  toggleDrawer() {
    this.setState({ open: !this.state.open });
  }

  handleClose() {
    this.setState({ open: false });
  }

  direct(path) {
    history.push(path);
    this.setState({ open: false });
  }

  render() {
    return (
      <MuiThemeProvider>


        <Router history={history} template={Template}>

          <div>
            <Route>
              <div>
                <Route component={Template} />
                <Route exact path="/" component={Home} />
                <Route path="/asset/:id" assetid="11" component={AssetData} />
                <Route path="/data" component={DataWizard} />
                <Route path="/users" component={Users} />
              </div>
            </Route>
          </div>
          {/* <Route
          path="/callback"
          render={(props) => {
          handleAuthentication(props);
          return <Callback {...props} />;
        }}
        /> */}

        </Router>

      </MuiThemeProvider>
    );
  }
}
