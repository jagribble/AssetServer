import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import 'whatwg-fetch';

import Loading from './Loading';

export default class DataType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      dataTypeName: '',
      dataTypeUnit: '',
      token: '',
    };
    this.submit = this.submit.bind(this);
    this.test = this.test.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  submit() {
    this.setState({
      loading: true,
    });
    const data = {
      name: `${this.state.dataTypeName}`,
      unit: `${this.state.dataTypeUnit}`,
    };
    console.log(JSON.stringify(data));
    // $.ajax({
    //   url: '/api/insert/datatype',
    //   method: 'POST',
    //   header: {
    //     Authorization: `Bearer ${this.state.token}`,
    //     ContentType: 'application/json',
    //   },
    //   body: JSON.stringify({
    //     name: 'test',
    //     unit: 'test',
    //   }),
    //   success(result) {
    //     console.log(result);
    //     this.setState({
    //       loading: false,
    //     });
    //   },
    // });
    fetch('/api/insert/dataType', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then((result) => {
      console.log(result);
      this.setState({
        loading: false,
      });
    }).catch((error) => {
      console.error(error);
      this.setState({
        loading: false,
      });
    });
    // fetch('/api/insert/dataType', {
    //   method: 'post',
    //   body: JSON.stringify(data),
    //   header: {
    //     Authorization: `Bearer ${this.state.token}`,
    //     'Content-Type': 'application/json',
    //   },
    //
    // }).then((result) => {
    //   console.log(result);
    //   this.setState({
    //     loading: false,
    //   });
    // }).catch((error) => {
    //   console.error(error);
    //   this.setState({
    //     loading: false,
    //   });
    // });
  }

  handleChange(event) {
    console.log(event.target.name);
    if (event.target.name === 'name') {
      this.setState({
        dataTypeName: event.target.value,
      });
    } else if (event.target.name === 'unit') {
      this.setState({
        dataTypeUnit: event.target.value,
      });
    }
  }

  test() {
    console.log(this.state.dataTypeName);
  }

  render() {
    let loading = null;
    if (this.state.loading) { loading = <Loading />; } else {
      loading = null;
    }
    // onClick={this.submit()}
    return (
      <div>
        <Card>
          <CardText>
            <h2>Make a data type</h2>
        Name of data Type: <TextField id="name" name="name" onChange={this.handleChange} value={this.state.dataTypeName} />
            <br />
        Unit of data Type: <TextField id="unit" name="unit" onChange={this.handleChange} value={this.state.dataTypeUnit} />
            <br />
            <RaisedButton label="Submit" primary onTouchTap={this.submit} />

          </CardText>
        </Card>
        {loading}
      </div>
    );
  }
}
