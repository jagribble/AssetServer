import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { Container, Row, Col } from 'react-grid-system';
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
      open: false,
      message: '',
      modalTitle: '',
    };
    this.submit = this.submit.bind(this);
    this.handleClose = this.handleClose.bind(this);
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

    fetch('/api/insert/dataType', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then((result) => {
      console.log(result);
      this.setState({
        loading: false,
        open: true,
        modalTitle: 'Success',
        message: 'DataType successfully made!',
        dataTypeName: '',
        dataTypeUnit: '',
      });
    }).catch((error) => {
      console.error(error);
      this.setState({
        loading: false,
        open: true,
        modalTitle: 'Error',
        message: 'DataType unsuccessfull!',
      });
    });
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

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    let loading = null;
    if (this.state.loading) { loading = <Loading />; } else {
      loading = null;
    }
    // onClick={this.submit()}
    return (
      <Container fluid>
        <Card>
          <CardText>
            <h2>Make a data type</h2>

            <Row>
              <Col xs={12} md={8}>
        Name of data Type:
              </Col>
              <Col xs={12} md={8}>
                <TextField
                  id="name"
                  name="name"
                  onChange={this.handleChange}
                  value={this.state.dataTypeName}
                />
              </Col>
            </Row>

            <Row>
              <Col xs={12} md={8}>
        Unit of data Type:
              </Col>
              <Col xs={12} md={8}>
                <TextField
                  id="unit"
                  name="unit"
                  onChange={this.handleChange}
                  value={this.state.dataTypeUnit}
                />
              </Col>
            </Row>
            <br />
            <RaisedButton label="Submit" primary onTouchTap={this.submit} />

          </CardText>
        </Card>
        {loading}
        <Dialog
          title={this.state.modalTitle}
          modal
          actions={<FlatButton
            label="Ok"
            primary
            onClick={this.handleClose}
          />}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          {this.state.message}
        </Dialog>
      </Container>
    );
  }
}
