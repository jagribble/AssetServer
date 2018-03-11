import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow, TableRowColumn,
} from 'material-ui/Table';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { Row, Col } from 'react-grid-system';
import { Line } from 'react-chartjs-2';

import GoogleMap from './GoogleMaps';
import Loading from './Loading';

export default class AssetData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assetData: [],
      asset: {},
      lat: 0,
      lng: 0,
      dialogOpen: false,
      assetDelete: '',
    };

    this.getAssetData = this.getAssetData.bind(this);
    this.getDataRows = this.getDataRows.bind(this);
    this.getAsset = this.getAsset.bind(this);
    this.getMap = this.getMap.bind(this);
    this.getGraphData = this.getGraphData.bind(this);
    this.delete = this.delete.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.deleteChange = this.deleteChange.bind(this);
    this.deleteConfirm = this.deleteConfirm.bind(this);
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

  delete() {
    this.setState({
      dialogOpen: true,
    });
  }

  deleteConfirm() {
    if (this.state.assetDelete === this.state.asset.assetname) {
      // delete asset
      fetch(`/api/delete/${this.state.asset.assetid}`, { method: 'delete' }).then((result) => {
        console.log(result);
        return result.json();
      }).catch((error) => {
        console.log(error);
      }).then((res) => {
        console.log(res);
        this.setState({
          dialogOpen: false,
        }, () => {
          this.props.history.push('/');
        });
      });
    } else {
      this.setState({ dialogOpen: false });
    }
  }

  deleteChange(event) {
    this.setState({ assetDelete: event.target.value });
  }

  handleClose() {
    this.setState({ dialogOpen: !this.state.dialogOpen });
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Delete"
        style={{ color: '#ff0000' }}
        onClick={this.deleteConfirm}
      />,
    ];
    if (this.state.asset !== {}) {
      return (
        <div>
          <Card style={{ margin: '10px' }}>
            <CardText>
              <Row>
                <Col>
                  <h1>{this.state.asset.assetname}</h1>
                </Col>
                <Col>
                  <RaisedButton
                    label="Delete"
                    labelColor="#ff0000"
                    onTouchTap={this.delete}
                    style={{ float: 'right' }}
                  />
                </Col>
              </Row>
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
              <Dialog
                title={`Delete${this.state.asset.assetname}`}
                actions={actions}
                modal={false}
                open={this.state.dialogOpen}
                onRequestClose={this.handleClose}
              >
            Are you sure you want to delete&nbsp;
                <code style={{ backgroundColor: '#d4d3d3' }}>
                  <i>
                    {this.state.asset.assetname}
                  </i>
                </code>?
            Do delete please enter the name of the asset below.<br />
                <TextField
                  name="assetDelete"
                  hintText="Asset Name"
                  value={this.state.assetDelete}
                  onChange={this.deleteChange}
                />
              </Dialog>
            </CardText>
          </Card>
        </div>
      );
    }
      <Loading />;
  }
}
