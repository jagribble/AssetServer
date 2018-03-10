import React, { Component } from 'react';
import { Card, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Container, Row, Col } from 'react-grid-system';

import Loading from './Loading';

export default class CreateComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      organization: '',
      loading: false,
    };
    this.change = this.change.bind(this);
    this.submit = this.submit.bind(this);
  }

  change(event) {
    this.setState({ organization: event.target.value });
  }

  submit() {
    const data = {
      name: this.state.organization,
    };
    this.setState({ loading: true });
    fetch('/api/insert/organization', {
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
  }

  render() {
    if (this.state.loading) {
      return (<Loading />);
    }
    return (
      <Card style={{ margin: '10px' }}>
        <CardText>
          <Container>
            <Row>
              <Col><center>Fill form below to create an organization</center></Col>
            </Row>
            <Row>
              <Col><center>Organization name</center></Col>
              <Col>
                <TextField name="org_name" value={this.state.organization} onChange={this.change} />
              </Col>
            </Row>
            <Row>
              <Col>
                <RaisedButton label="Submit" onTouchTap={this.submit} />
              </Col>
            </Row>
            <br />

          </Container>
        </CardText>
      </Card>
    );
  }
}
