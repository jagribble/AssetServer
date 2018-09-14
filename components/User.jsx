import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardText } from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';
// import Container from 'muicss/lib/react/container';
import { Container, Row, Col } from 'react-grid-system';
// import Col from 'muicss/lib/react/col';


export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: -1,
      org: '',
    };
    this.getOrgItems = this.getOrgItems.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.props.orgs.forEach((org, i) => {
      if (org.orginizationid.toString() === this.props.orgID) {
        this.setState({
          value: i,
          org: org.orginizationid,
        });
      }
    });
  }

  getOrgItems() {
    return this.props.orgs.map((org, i) => {
      return <MenuItem key={org.name} value={i} primaryText={org.name} />;
    });
  }

  handleChange(event, index, value) {
    this.setState({ value, org: this.props.orgs[value].orginizationid });
  }

  render() {
    return (
      <Card style={{ margin: '5px' }}>
        <CardText>
          <Container fluid>
            <Row>
              <Col xs={6} sm={3}>
                <Avatar src={this.props.user.picture} />
              </Col>
              <Col xs={6} sm={3}>
                <p>{this.props.user.name}</p>
              </Col>
              <Col xs={6} sm={3}>
                <SelectField
                  value={this.state.value}
                  hintText="organisation"
                  onChange={this.handleChange}
                >
                  {this.getOrgItems()}
                </SelectField>
              </Col>
              <Col xs={6} sm={3}>
                <RaisedButton
                  label={this.props.buttonText}
                  primary
                  onClick={() => {
                  this.props.addUser(this.props.user.user_id, this.state.org);
                }}
                />
              </Col>
            </Row>
          </Container>
        </CardText>
      </Card>);
  }
}
