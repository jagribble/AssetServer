import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class DataTypes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      dataTypeName: '',
      dataTypeUnit:'',
    };
    this.submit = this.submit.bind(this);
  }

  submit() {
    this.setState({
      loading: true,
    });
    fetch('http://assetar-stg.herokuapp.com/api/intert/datatype', {
      header: {
        Authorization: `Bearer ${this.state.token}`,
      },
    }).then((result) => {
      console.log('result');
      return result.json();
    }).catch((error) => {
      console.error(error);
      this.setState({
        loading: false,
      });
    }).then((data) => {
      this.setState({
        console.log(data);
        loading: false,
      });
    });
  }

  render() {
    let loading = null;
    if (this.state.loading) { loading = <Loading />; } else {
      loading = null;
    }
    return (
      <div>
        <h2>Make a data type</h2>
        Name of data Type: <TextField value={this.state.dataTypeName} />
        <br />
        Unit of data Type: <TextField value={this.state.dataTypeUnit} />
        <RaisedButton label="Submit" primary onclick={this.submit()} />
        {loading}
      </div>
    );
  }
}
