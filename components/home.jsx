import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardText } from 'material-ui/Card';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import fetch from 'node-fetch';
// import Auth from './Auth/Auth.js';


// const Home = () => {
//   return (
//     <div>
//       <AppBar
//         title="AssetAR"
//         iconClassNameRight="muidocs-icon-navigation-expand-more"
//       />
//     </div>);
// };
//
// export default Home;
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.getData = this.getData.bind(this);
    // const auth = new Auth();
    // auth.login();
  }

  getData() {
    fetch('https://app79553870.auth0.com/oauth/token', {
      method: 'POST',
      header: { contentType: 'application/json', AccessControlAllowOrigin: '*' },
      body: {
        grant_type: 'client_credentials',
        client_id: 'zpnwpy9WANpL0KPI2ERHYWrOWXbEx0pK',
        client_secret: '_xKtDH2P4ioe1dl0Hf0vbBf1nRE8utR740KZyyJEjSvh9L1zWGU5XO7WsU7vk5sV',
        audience: 'https://assetar-stg.herokuapp.com/',
      },
    }).then((result) => {
      console.log(result);
    //  this.setState({ data: result });
    });
  }


  render() {
    this.getData();
    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            title="AssetAR"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
          />
          <Card style={{ margin: '10px' }}>
            <CardText>
              <h3>AssetAR Assets</h3>
              <Table>
                <TableHeader
                  displaySelectAll={false}
                  adjustForCheckbox={false}
                >
                  <TableRow>
                    <TableHeaderColumn>ID</TableHeaderColumn>
                    <TableHeaderColumn>Name</TableHeaderColumn>
                    <TableHeaderColumn>lattitude</TableHeaderColumn>
                    <TableHeaderColumn>longitude</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody
                  displayRowCheckbox={false}
                >
                  <TableRow>
                    <TableRowColumn>1</TableRowColumn>
                    <TableRowColumn>John Smith</TableRowColumn>
                    <TableRowColumn>Employed</TableRowColumn>
                    <TableRowColumn>1</TableRowColumn>
                  </TableRow>
                  <TableRow>
                    <TableRowColumn>2</TableRowColumn>
                    <TableRowColumn>Randal White</TableRowColumn>
                    <TableRowColumn>Unemployed</TableRowColumn>
                    <TableRowColumn>1</TableRowColumn>
                  </TableRow>
                  <TableRow>
                    <TableRowColumn>3</TableRowColumn>
                    <TableRowColumn>Stephanie Sanders</TableRowColumn>
                    <TableRowColumn>Employed</TableRowColumn>
                    <TableRowColumn>1</TableRowColumn>
                  </TableRow>
                  <TableRow>
                    <TableRowColumn>4</TableRowColumn>
                    <TableRowColumn>Steve Brown</TableRowColumn>
                    <TableRowColumn>Employed</TableRowColumn>
                    <TableRowColumn>1</TableRowColumn>
                  </TableRow>
                  <TableRow>
                    <TableRowColumn>5</TableRowColumn>
                    <TableRowColumn>Christopher Nolan</TableRowColumn>
                    <TableRowColumn>Unemployed</TableRowColumn>
                    <TableRowColumn>1</TableRowColumn>
                  </TableRow>
                </TableBody>
              </Table>
            </CardText>
          </Card>
        </div>
      </MuiThemeProvider>);
  }
}
