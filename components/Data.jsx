import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import 'whatwg-fetch';

import Loading from './Loading';

export default class Data extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      dataTypes: [],
      assets: [],
      assetValue: null,
      dataTypeValue: null,
      token: '',
      value: '',
      open: false,
      message: '',
      modalTitle: '',
    };
    // this.submit = this.submit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderAssets = this.renderAssets.bind(this);
    this.renderDataTypes = this.renderDataTypes.bind(this);
    this.handleChangeDataType = this.handleChangeDataType.bind(this);
    this.getAssets = this.getAssets.bind(this);
    this.getDataTypes = this.getDataTypes.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    this.getAssets();
    this.getDataTypes();
  }


  getAssets() {
    fetch('/api/assets').then((result) => {
      return result.json();
    }).catch((error) => {
      console.error(error);
      this.setState({
        loading: false,
        open: true,
        modalTitle: 'Error',
        message: 'Could not get assets!',
      });
    }).then((res) => {
      console.log(res.rows);
      this.setState({
        loading: false,
        assets: res.rows,
      });
    });
  }


  getDataTypes() {
    fetch('/api/dataType').then((result) => {
      return result.json();
    }).catch((error) => {
      console.error(error);
      this.setState({
        loading: false,
        open: true,
        modalTitle: 'Error',
        message: 'Could not get assets!',
      });
    }).then((res) => {
      console.log(res.rows);
      this.setState({
        loading: false,
        dataTypes: res.rows,
      });
    });
  }
  submit() {
    this.setState({
      loading: true,
    });
    const now = new Date();
    const year = `${now.getFullYear()}`;
    let month = `${now.getMonth() + 1}`; if (month.length === 1) { month = `0${month}`; }
    let day = `${now.getDate()}`; if (day.length === 1) { day = `0${day}`; }
    let hour = `${now.getHours()}`; if (hour.length === 1) { hour = `0${hour}`; }
    let minute = `${now.getMinutes()}`; if (minute.length === 1) { minute = `0${minute}`; }
    let second = `${now.getSeconds()}`; if (second.length === 1) { second = `0${second}`; }
    const data = {
      data: `${this.state.value}`,
      time: `${year}-${month}-${day} ${hour}:${minute}:${second}`,
    };
    console.log(JSON.stringify(data));

    fetch(`/api/insert/asset/${this.state.assetValue}/datapoint/datatype/${this.state.dataTypeValue}`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then((result) => {
      return result.json();
    }).catch((error) => {
      console.error(error);
      this.setState({
        loading: false,
        open: true,
        modalTitle: 'Error',
        message: 'DataPoint unsuccessfull!',
        assetValue: null,
        dataTypeValue: null,
      });
    }).then((res) => {
      console.log(res);
      this.setState({
        loading: false,
        open: true,
        modalTitle: 'Success',
        message: 'DataPoint successfully made!',
      });
    });
  }


  handleChange(event, index, value) {
    this.setState({
      assetValue: value,
    });
  }
  handleChangeDataType(event, index, value) {
    this.setState({
      dataTypeValue: value,
    });
  }

  handleValueChange(event) {
    this.setState({ value: event.target.value });
  }

  handleClose() {
    this.setState({ open: false });
  }

  renderDataTypes() {
    if (this.state.dataTypes.length > 0) {
      return this.state.dataTypes.map((type) => {
        return (
          <MenuItem
            key={type.datatypeid}
            name="assets"
            value={type.datatypeid}
            primaryText={type.dataname}
          />);
      });
    }
    return (<MenuItem value={null} primaryText="no assets" />);
  }

  renderAssets() {
    if (this.state.assets.length > 0) {
      return this.state.assets.map((asset) => {
        return (
          <MenuItem
            key={asset.assetid}
            name="assets"
            value={asset.assetid}
            primaryText={asset.assetname}
          />);
      });
    }
    return (<MenuItem value={null} primaryText="no assets" />);
  }

  render() {
    let loading = null;
    if (this.state.loading) { loading = <Loading />; } else {
      loading = null;
    }
    // onClick={this.submit()}
    return (
      <div>
        <Card>
          <CardText>
            <h2>Add Data</h2>
        Asset:
            <DropDownMenu
              maxHeight={300}
              style={{ width: 200 }}
              name="assets"
              value={this.state.assetValue}
              onChange={this.handleChange}
            >
              {this.renderAssets()}
            </DropDownMenu>
            <br />
        Data Type:
            <DropDownMenu
              maxHeight={300}
              style={{ width: 200 }}
              name="assets"
              value={this.state.dataTypeValue}
              onChange={this.handleChangeDataType}
            >
              {this.renderDataTypes()}
            </DropDownMenu>
            <br />
            Value:
            <TextField
              name="dataValue"
              value={this.state.value}
              onChange={this.handleValueChange}
            /><br />
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
      </div>
    );
  }
}
