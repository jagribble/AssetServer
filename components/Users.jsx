import React, { Component } from 'react';
import { Card, CardText } from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import 'whatwg-fetch';

import User from './User';

export default class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      appUsers: [],
      organization: [],
    };
    this.getApiUsers = this.getApiUsers.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.getAppUsers = this.getAppUsers.bind(this);
    this.getOrgs = this.getOrgs.bind(this);
    this.addUser = this.addUser.bind(this);
  }

  componentWillMount() {
    this.getApiUsers();
    this.getAppUsers();
    this.getOrgs();
  }

  getApiUsers() {
    fetch('/api/auth/users', {
      header: {
        Authorization: 'Bearer this.state.token',
      },
    }).then((result) => {
      console.log('result');
      return result.json();
    }).catch((error) => {
      console.error(error);
    }).then((data) => {
      console.log(data);
      this.setState({
        users: data,
      });
    });
  }

  getAppUsers() {
    fetch('/api/appuser', {
      header: {
        Authorization: 'Bearer this.state.token',
      },
    }).then((result) => {
      console.log('result');
      return result.json();
    }).catch((error) => {
      console.error(error);
    }).then((data) => {
      console.log(data);
      this.setState({
        appUsers: data.rows,
      });
    });
  }

  getOrgs() {
    fetch('/api/orginization', {
      header: {
        Authorization: 'Bearer this.state.token',
      },
    }).then((result) => {
      console.log('result');
      return result.json();
    }).catch((error) => {
      console.error(error);
    }).then((data) => {
      console.log(data);
      this.setState({
        organization: data.rows,
      });
    });
  }


  getUsers() {
    // TODO: filter if they are already created in the AppUser table (still allow to modify org)
    return this.state.users.map((user) => {
      return (
        <User
          key={user.user_id}
          user={user}
          orgs={this.state.organization}
          addUser={(userId, org) => { this.addUser(userId, org); }}
        />);
    });
  }

  addUser(userId, org) {
    const body = JSON.stringify({
      userId,
      orgId: org,
    });
    console.log(userId);
    console.log(org);
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
      }).then((data) => {
        console.log(data);
        this.setState({
          organization: data.rows,
        });
      });
  }


  render() {
    return (<div>{this.getUsers()}</div>);
  }
}
