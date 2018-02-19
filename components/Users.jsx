import React, { Component } from 'react';
import { Card, CardText } from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import 'whatwg-fetch';

import User from './User';
import Loading from './Loading';

export default class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      appUsers: [],
      organization: [],
      loading: false,
      loadingAPI: false,
      loadingApp: false,
      loadingOrg: false,
    };
    this.getApiUsers = this.getApiUsers.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.getAppUsers = this.getAppUsers.bind(this);
    this.getOrgs = this.getOrgs.bind(this);
    this.addUser = this.addUser.bind(this);
    this.displayAppUsers = this.displayAppUsers.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  componentWillMount() {
    this.getApiUsers();
    this.getAppUsers();
    this.getOrgs();
  }

  getApiUsers() {
    this.setState({ loadingAPI: true });
    fetch('/api/auth/users', {
      header: {
        Authorization: 'Bearer this.state.token',
      },
    }).then((result) => {
      console.log('result');
      return result.json();
    }).catch((error) => {
      console.error(error);
      this.setState({ loadingAPI: false });
    }).then((data) => {
      console.log(data);
      this.setState({
        users: data,
        loadingAPI: false,
      });
    });
  }

  getAppUsers() {
    this.setState({ loadingApp: true });
    fetch('/api/appuser', {
      header: {
        Authorization: 'Bearer this.state.token',
      },
    }).then((result) => {
      console.log('result');
      return result.json();
    }).catch((error) => {
      console.error(error);
      this.setState({ loadingApp: false });
    }).then((data) => {
      console.log(data);
      this.setState({
        appUsers: data.rows,
        loadingApp: false,
      });
    });
  }

  getOrgs() {
    this.setState({ loadingOrg: true });
    fetch('/api/orginization', {
      header: {
        Authorization: 'Bearer this.state.token',
      },
    }).then((result) => {
      console.log('result');
      return result.json();
    }).catch((error) => {
      console.error(error);
      this.setState({ loadingOrg: false });
    }).then((data) => {
      console.log(data);
      this.setState({
        organization: data.rows,
        loadingOrg: false,
      });
    });
  }


  getUsers() {
    // TODO: filter if they are already created in the AppUser table (still allow to modify org)
    return this.state.users.map((user) => {
      const userExits = this.state.appUsers.findIndex((appUser) => {
        if (appUser.userid === user.user_id) {
          return appUser;
        }
        return null;
      });
      console.log(userExits);
      if (userExits === -1) {
        return (
          <User
            key={user.user_id}
            user={user}
            buttonText="Submit"
            orgs={this.state.organization}
            addUser={(userId, org) => { this.addUser(userId, org); }}
          />);
      }

      return null;
    });
  }

  displayAppUsers() {
    if (this.state.users.length > 0) {
      return this.state.appUsers.map((user) => {
        const userExits = this.state.users.findIndex((authUser) => {
          if (authUser.user_id === user.userid) {
            return authUser;
          }
          return null;
        });
        console.log(user.organizationid);
        return (<User
          key={user.userid}
          user={this.state.users[userExits]}
          orgID={user.organizationid}
          orgs={this.state.organization}
          buttonText="Update"
          addUser={(userId, org) => { this.updateUser(userId, org); }}
        />);
      });
    }
    return null;
  }

  addUser(userId, org) {
    const body = JSON.stringify({
      userId,
      orgId: org,
    });
    console.log(userId);
    console.log(org);
    this.setState({ loading: true });
    fetch(`/api/${org}/insert/user`, {
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
      },
      body,
    })
      .then((result) => {
        console.log('result');
        return result.json();
      }).catch((error) => {
        console.error(error);
        this.setState({ loading: false });
      }).then((data) => {
        console.log(data);
        this.getApiUsers();
        this.getAppUsers();
        this.getOrgs();
        this.forceUpdate();
        this.setState({ loading: false });
      });
  }

  updateUser(userId, org) {
    this.setState({ loading: true });
    fetch(`/api/${org}/appuser/${userId}`, {
      method: 'PUT',
      headers: {
        'content-Type': 'application/json',
      },
    })
      .then((result) => {
        console.log('result');
        return result.json();
      }).catch((error) => {
        console.error(error);
        this.setState({ loading: false });
      }).then((data) => {
        console.log(data);
        this.getApiUsers();
        this.getAppUsers();
        this.getOrgs();
        this.forceUpdate();
        this.setState({ loading: false });
      });
  }


  render() {
    if (this.state.loading
      || this.state.loadingAPI
      || this.state.loadingApp
      || this.state.loadingOrg) {
      return <Loading />;
    }
    return (
      <div>
        <Card>
          <CardText>
            <h1>Users with organization</h1>
            {this.displayAppUsers()}
            <h1>Users without organization</h1>
            {this.getUsers()}
          </CardText>
        </Card>
      </div>);
  }
}
