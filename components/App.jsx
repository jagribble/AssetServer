// src/routes.js

import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import { Route, BrowserRouter } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import Home from './home';
import DataWizard from './DataWizard';
import AssetData from './AssetData';
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


const makeMainRoutes = () => {
  injectTapEventPlugin();
  return (
    <MuiThemeProvider>
      <div>
        <AppBar
          onTitleClick={goHome}
          title="AssetAR"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
        <BrowserRouter >
          <div>
            <Route exact path="/" component={Home} />
            <Route path="/asset/:id" assetid="11" component={AssetData} />
            <Route path="/data" component={DataWizard} />
            {/* <Route
          path="/callback"
          render={(props) => {
          handleAuthentication(props);
          return <Callback {...props} />;
        }}
        /> */}
          </div>
        </BrowserRouter>
      </div>
    </MuiThemeProvider>
  );
};

export default makeMainRoutes;
