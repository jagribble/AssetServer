// src/routes.js

import React from 'react';
import { Route, Router } from 'react-router-dom';
import Home from './home';
import Callback from './Auth/callback';
import Auth from './Auth/Auth';
import history from './Auth/history';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
};

const makeMainRoutes = () => {
  return (
    <Router history={history} component={Home}>
      <div>
        <Route path="/" render={(props) => { return <Home auth={auth} {...props} />; }} />
        <Route path="/home" render={(props) => { return <Home auth={auth} {...props} />; }} />
        <Route
          path="/callback"
          render={(props) => {
          handleAuthentication(props);
          return <Callback {...props} />;
        }}
        />
      </div>
    </Router>
  );
};

export default makeMainRoutes;
