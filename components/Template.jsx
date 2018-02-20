import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { Route } from 'react-router-dom';
import Home from './home';
import DataWizard from './DataWizard';
import AssetData from './AssetData';
import Users from './Users';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.direct = this.direct.bind(this);
    this.goHome = this.goHome.bind(this);
  }

  toggleDrawer() {
    this.setState({ open: !this.state.open });
  }

  handleClose() {
    this.setState({ open: false });
  }

  direct(path) {
    console.log(this.props.history);
    this.props.history.push(path);
    this.setState({ open: false });
  }

  goHome() {
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <AppBar
          onTitleClick={this.goHome}
          onLeftIconButtonClick={this.toggleDrawer}
          title="AssetAR"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
        <Drawer
          open={this.state.open}
          onRequestChange={this.handleClose}
          docked={false}
        >
          <MenuItem onClick={() => { return this.direct('/'); }}>Home</MenuItem>
          <MenuItem onClick={() => { return this.direct('/data'); }}>Add data / Data types</MenuItem>
          <MenuItem onClick={() => { return this.direct('/users'); }}>Users</MenuItem>
        </Drawer>
        {this.props.children}
      </div>);
  }
}
