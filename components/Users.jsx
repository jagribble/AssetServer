import React, { Component } from 'react';
import { Card, CardText } from 'material-ui/Card';
import 'whatwg-fetch';

export default class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
    this.getApiUsers = this.getApiUsers.bind(this);
    this.getUsers = this.getUsers.bind(this);
  }

  componentWillMount() {
    this.getApiUsers();
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

  getUsers() {
    return this.state.users.map((user) => {
      return (
        <Card key={user.user_id} style={{ margin: '5px' }}>
          <CardText>
            <p>{user.name}</p>
          </CardText>
        </Card>);
    });
  }

  render() {
    return (<div>{this.getUsers()}</div>);
  }
}
