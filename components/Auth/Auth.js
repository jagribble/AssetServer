// import auth0 from 'auth0-js';
import history from './history';

// ...
export default class Auth {
  // ...
  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.setSession = this.setSession.bind(this);
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        history.replace('/home');
      } else if (err) {
        history.replace('/home');
        console.log(err);
      }
    });
  }

  setSession(authResult) {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    this.localStorage.setItem('access_token', authResult.accessToken);
    this.localStorage.setItem('id_token', authResult.idToken);
    this.localStorage.setItem('expires_at', expiresAt);
    // navigate to the home route
    history.replace('/home');
  }

  logout() {
    // Clear access token and ID token from local storage
    this.localStorage.removeItem('access_token');
    this.localStorage.removeItem('id_token');
    this.localStorage.removeItem('expires_at');
    // navigate to the home route
    history.replace('/home');
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(this.localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}
