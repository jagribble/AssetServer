import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow, TableRowColumn,
} from 'material-ui/Table';
import { Card, CardText } from 'material-ui/Card';
import { Line } from 'react-chartjs-2';

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
    this.getGraphData = this.getGraphData.bind(this);
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

  getGraphData() {
    const graphData = {
      labels: [],
      datasets: [
        {
          label: `${this.state.asset.assetname}`,
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 3,
          pointHitRadius: 10,
          data: [],
        },
      ],
    };

    this.state.assetData.forEach((assetData) => {
      const date = new Date(assetData.timestamp);
      graphData.datasets[0].data.push(assetData.data);
      graphData.labels.push(date.toGMTString());
    }, () => {
      return graphData;
    });
    return graphData;
  }

  render() {
    // const center = { lat: this.state.lat, lng: this.state.lng };
    console.log(this.getGraphData());
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
            <Line data={this.getGraphData} />

          </CardText>
        </Card>
      </div>
    );
  }
}
