import React, { Component } from 'react';
import { Card, CardText } from 'material-ui/Card';
import { Tabs, Tab } from 'material-ui/Tabs';
import 'whatwg-fetch';
import GoogleMap from './GoogleMaps';
// import $ from 'jquery';

import AssetTable from './AssetTable';
import Loading from './Loading';
import Charts from './Charts';
// import Auth from './Auth/Auth.js';

// { display: 'none' };


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingAsset: false,
      loadingOrg: false,
      loadingUsers: false,
      data: [],
      users: [],
      organisations: [],
      token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlJrSTVNREkyUVRZelFVUXhNamN6UlRjd05FUXdRa05FTUVFM1JVWTRNelJFUTBReFFUVkNOdyJ9.eyJpc3MiOiJodHRwczovL2FwcDc5NTUzODcwLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw1YTUzZmQxN2NmYjMxYTI3ODkzNDUyZGYiLCJhdWQiOlsiaHR0cHM6Ly9hc3NldGFyLXN0Zy5oZXJva3VhcHAuY29tLyIsImh0dHBzOi8vYXBwNzk1NTM4NzAuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTUxNjgyNDQ4MiwiZXhwIjoxNTE2OTEwODgyLCJhenAiOiIyQXFmcm40azI0VkV2d0tjdTBXbVJsTWdqNlNrSVU2WiIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgcmVhZDphc3NldHMiLCJndHkiOiJwYXNzd29yZCJ9.UT-ziUChuvWE2ezktTNDc-Fc5k2FQtOSuuEbufVUxLeq189Gvck5XNH4Vma-Qa6jF4cUKCu0nVjU4mLueilKAey3WT3DU_yT7bhkBHhc3uuDlng2PCySKWbBroR0X0c9rWhJALI9N4XipPhoXcxxH2D_GO6QWzkpdKDRrbATdVo-GmVCJKuCHuYgUtcX4VvxKFLgiv6okYL9geRvKvK6NAL3m1XQQ4K9As2wAjlE0lQKEVj2IF0ancw6r3QXzju7PvJncjN9uRN-BODOC9zbcW3qy3GCwsyHg_gqdodfLDSnuxIVHKQ3VpTpYm42e77TmTVErQIUZPAK95uXwCjRPg',
    };
    this.getData = this.getData.bind(this);
    this.getOrganisations = this.getOrganisations.bind(this);
    this.getUsers = this.getUsers.bind(this);
    // const auth = new Auth();
    // auth.login();
  }

  componentDidMount() {
    this.getData();
    this.getOrganisations();
    this.getUsers();
  }


  getData() {
    this.setState({
      loadingAsset: true,
    });
    fetch('/api/assets', {
      header: {
        Authorization: `Bearer ${this.state.token}`,
      },
    }).then((result) => {
      return result.json();
    }).catch((error) => {
      console.error(error);
      this.setState({
        data: error,
        loadingAsset: false,
      });
    }).then((data) => {
      this.setState({
        data: data.rows,
        loadingAsset: false,
      });
    });
  }

  getOrganisations() {
    this.setState({ loadingOrg: true });
    fetch('/api/organisation', {
      header: {
        Authorization: `Bearer ${this.state.token}`,
      },
    }).then((result) => {
      return result.json();
    }).catch((error) => {
      console.error(error);
      this.setState({
        data: error,
        loadingOrg: false,
      });
    }).then((data) => {
      this.setState({
        organisations: data.rows,
        loadingOrg: false,
      });
    });
  }

  getUsers() {
    this.setState({ loadingUsers: true });
    fetch('/api/appuser', {
      header: {
        Authorization: `Bearer ${this.state.token}`,
      },
    }).then((result) => {
      return result.json();
    }).catch((error) => {
      console.error(error);
      this.setState({
        data: error,
        loadingOrg: false,
      });
    }).then((data) => {
      this.setState({
        users: data.rows,
        loadingUsers: false,
      });
    });
  }

  render() {
    let loading = null;
    if (this.state.loadingAsset || this.state.loadingOrg ||
      this.state.loadingUsers) { loading = <Loading />; } else {
      loading = null;
    }
    return (
      <div >
        <Card style={{ margin: '10px' }}>
          <CardText>
            <Tabs>
              <Tab label="Table" >
                <h3>AssetAR Assets</h3>
                <GoogleMap assets={this.state.data} zoom={14} />
                <AssetTable data={this.state.data} history={this.props.history} />
              </Tab>
              <Tab label="Charts">
                <Charts
                  assets={this.state.data}
                  users={this.state.users}
                  orgs={this.state.organisations}
                />
              </Tab>
            </Tabs>
          </CardText>
        </Card>
        {loading}

      </div>
    );
  }
}
