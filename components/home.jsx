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
import $ from 'jquery';
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
      data: {},
      token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlJrSTVNREkyUVRZelFVUXhNamN6UlRjd05FUXdRa05FTUVFM1JVWTRNelJFUTBReFFUVkNOdyJ9.eyJpc3MiOiJodHRwczovL2FwcDc5NTUzODcwLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw1YTUzZmQxN2NmYjMxYTI3ODkzNDUyZGYiLCJhdWQiOlsiaHR0cHM6Ly9hc3NldGFyLXN0Zy5oZXJva3VhcHAuY29tLyIsImh0dHBzOi8vYXBwNzk1NTM4NzAuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTUxNjgyNDQ4MiwiZXhwIjoxNTE2OTEwODgyLCJhenAiOiIyQXFmcm40azI0VkV2d0tjdTBXbVJsTWdqNlNrSVU2WiIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgcmVhZDphc3NldHMiLCJndHkiOiJwYXNzd29yZCJ9.UT-ziUChuvWE2ezktTNDc-Fc5k2FQtOSuuEbufVUxLeq189Gvck5XNH4Vma-Qa6jF4cUKCu0nVjU4mLueilKAey3WT3DU_yT7bhkBHhc3uuDlng2PCySKWbBroR0X0c9rWhJALI9N4XipPhoXcxxH2D_GO6QWzkpdKDRrbATdVo-GmVCJKuCHuYgUtcX4VvxKFLgiv6okYL9geRvKvK6NAL3m1XQQ4K9As2wAjlE0lQKEVj2IF0ancw6r3QXzju7PvJncjN9uRN-BODOC9zbcW3qy3GCwsyHg_gqdodfLDSnuxIVHKQ3VpTpYm42e77TmTVErQIUZPAK95uXwCjRPg',
    };
    this.getData = this.getData.bind(this);
    // const auth = new Auth();
    // auth.login();
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    // $.ajax({
    //   url: 'https://assetar-stg.herokuapp.com/api/assets',
    //   header: {
    //     Authorization: `Bearer ${this.state.token}`,
    //     contentType: 'application/json',
    //     AccessControlAllowHeaders: 'Content-Type',
    //   },
    //   success(result) {
    //     console.log('result');
    //     this.setState({ data: result.json() });
    //   },
    // });
    // // fetch('https://assetar-stg.herokuapp.com/api/assets', {
    // //   header: {
    // //     Authorization: `Bearer ${this.state.token}`,
    // //   },
    // // }).then((result) => {
    // //   console.log('result');
    // //   this.setState({ data: result.json() });
    // // }).catch((error) => {
    // //   console.error(error);
    // //   this.setState({ data: error });
    // // });
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
      this.setState({ data: result.json() });
    });
  }


  render() {
    return (
      <MuiThemeProvider>
        <div style={{ width: '100vw' }}>
          <AppBar
            style={{ width: '100vw' }}
            title="AssetAR"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
          />
          <Card style={{ margin: '10px' }}>
            <CardText>
              <h3>AssetAR Assets</h3>
              <p>{JSON.stringify(this.state.data)}</p>
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
