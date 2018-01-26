// src/routes.js

import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import { Route, BrowserRouter } from 'react-router-dom';
import Home from './home';
import Data from './Data';
// import Callback from './Auth/callback';
// import Auth from './Auth/Auth';
// import history from './Auth/history';

// const auth = new Auth();

// const handleAuthentication = (nextState, replace) => {
//   if (/access_token|id_token|error/.test(nextState.location.hash)) {
//     auth.handleAuthentication();
//   }
// };

const makeMainRoutes = () => {
  return (
    <MuiThemeProvider>
      <div>
        <AppBar

          title="AssetAR"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
        <BrowserRouter >
          <div>
            <Route exact path="/" component={Home} />
            <Route path="/data" component={Data} />
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
