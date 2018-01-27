import React, { Component } from 'react';
import { Card, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import { Tabs, Tab } from 'material-ui/Tabs';

import DataType from './DataType';
import Data from './Data';

export default class DataWizard extends Component {
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
            <Data />
          </Tab>
          <Tab label="Add data type">
            <DataType />
          </Tab>
        </Tabs>

      </div>
    );
  }
}
