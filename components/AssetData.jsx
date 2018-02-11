import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow, TableRowColumn,
} from 'material-ui/Table';
import { Card, CardText } from 'material-ui/Card';
import Line from 'react-chartjs-2';

export default class AssetData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assetData: [],
    };

    this.getAssetData = this.getAssetData.bind(this);
    this.getDataRows = this.getDataRows.bind(this);
  }


  componentDidMount() {
    this.getAssetData();
  }

  getDataRows() {
    if (this.state.assetData.length > 0) {
      return this.state.assetData.map((datapoint) => {
        const date = new Date(datapoint.timestamp);
        return (
          <TableRow key={datapoint.datapointid}>
            <TableRowColumn>
              {datapoint.data}
            </TableRowColumn>
            <TableRowColumn>{date.toGMTString()}</TableRowColumn>
          </TableRow>);
      });
    }
    return (
      <TableRow>
        <TableRowColumn style={{ textAlign: 'center' }}>No Data</TableRowColumn>
      </TableRow>);
  }

  getAssetData() {
    const path = this.props.history.location.pathname;
    const assetId = path.split('/');
    fetch(`/api/asset/${assetId[assetId.length - 1]}/datapoints`).then((result) => {
      console.log(result);
      return result.json();
    }).catch((error) => {
      console.log(error);
    }).then((res) => {
      console.log(res.rows);
      this.setState({ assetData: res.rows }, () => {
        console.log(this.state.assetData);
      });
    });
  }

  render() {
    return (
      <div>
        <Card style={{ margin: '10px' }}>
          <CardText>
            <Table>
              <TableHeader
                displaySelectAll={false}
                adjustForCheckbox={false}
              >
                <TableRow>
                  <TableHeaderColumn>Data Value</TableHeaderColumn>
                  <TableHeaderColumn>Timestamp</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                {this.getDataRows()}
              </TableBody>
            </Table>
            <Line data={this.state.assetData} />
          </CardText>
        </Card>
      </div>
    );
  }
}
