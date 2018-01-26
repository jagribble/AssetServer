import React, { Component } from 'react';
import { Card, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import { Tabs, Tab } from 'material-ui/Tabs';

export default class Data extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataValue: '',
      dataType: '',
    };
  }
  render() {
    return (
      <div>
        <Tabs style={{ margin: '20px', alignText: 'auto' }}>
          <Tab label="Add data" >
            <Card >
              <CardText>
              Data Value: <TextField value={this.state.dataValue} /><br />
              </CardText>
            </Card>
          </Tab>
          <Tab label="Add data type">
            <Card >
              <CardText>
              Data Type: <TextField value={this.state.dataType} /><br />
              </CardText>
            </Card>
          </Tab>
        </Tabs>

      </div>
    );
  }
}
