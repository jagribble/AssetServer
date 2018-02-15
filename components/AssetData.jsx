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

import GoogleMap from './GoogleMaps';

export default class AssetData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assetData: [],
      asset: {},
      lat: 0,
      lng: 0,
    };

    this.getAssetData = this.getAssetData.bind(this);
    this.getDataRows = this.getDataRows.bind(this);
    this.getAsset = this.getAsset.bind(this);
    this.getMap = this.getMap.bind(this);
  }


  componentDidMount() {
    this.getAssetData();
    this.getAsset();
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

  getMap() {
    if (Object.keys(this.state.asset).length <= 0) {
      return (<div />);
    }
    const center = { lat: this.state.lat, lng: this.state.lng };
    return (<GoogleMap center={center} assets={[this.state.asset]} zoom={14} />);
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

  getAsset() {
    const path = this.props.history.location.pathname;
    const assetId = path.split('/');
    fetch(`/api/asset/${assetId[assetId.length - 1]}/`).then((result) => {
      console.log(result);
      return result.json();
    }).catch((error) => {
      console.log(error);
    }).then((res) => {
      console.log(res.rows);
      this.setState({
        asset: res.rows[0],
        lat: res.rows[0].assetx,
        lng: res.rows[0].assety,
      }, () => {
        console.log(this.state.assetData);
      });
    });
  }

  render() {
    const center = { lat: this.state.lat, lng: this.state.lng };
    return (
      <div>
        <Card style={{ margin: '10px' }}>
          <CardText>
            <h1>{this.state.asset.assetname}</h1>
            {this.getMap()}
            <Table style={{ marginTop: '1px' }}>
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
            {/* <Line data={this.state.assetData} /> */}

          </CardText>
        </Card>
      </div>
    );
  }
}
