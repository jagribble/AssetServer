// src/routes.js

import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Router } from 'react-router';
import { Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import Template from './Template';
import Home from './home';
import DataWizard from './DataWizard';
import AssetData from './AssetData';
import Users from './Users';
import Help from './Help';
import CreateOrganization from './CreateOrganization';
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


const MainRoutes = () => {
  injectTapEventPlugin();


  return (
    <MuiThemeProvider>
      <Router history={history}>
        <div>
          <Route>
            <div>
              <Route component={Template} />
              <Route exact path="/" component={Home} />
              <Route path="/asset/:id" assetid="11" component={AssetData} />
              <Route path="/data" component={DataWizard} />
              <Route path="/users" component={Users} />
              <Route path="/help" component={Help} />
              <Route path="/organization" component={CreateOrganization} />
            </div>
          </Route>
        </div>

      </Router>

    </MuiThemeProvider>
  );
};


export default MainRoutes;
