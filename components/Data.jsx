import React, { Component } from 'react';
import { Card, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import { Tabs, Tab } from 'material-ui/Tabs';

import DataType from './DataType';

export default class Data extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataValue: '',
    };
  }
  render() {
    return (
      <div>
        <Tabs style={{ margin: '20px', alignText: 'auto' }}>
          <Tab label="Add data" >
            <Card >
              <CardText>
              Data Value: <TextField id="dataValue" name="dataValue" value={this.state.dataValue} /><br />
              </CardText>
            </Card>
          </Tab>
          <Tab label="Add data type">
            <DataType />
          </Tab>
        </Tabs>

      </div>
    );
  }
}
