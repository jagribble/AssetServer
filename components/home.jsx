import React, { Component } from 'react';
import { Card, CardText } from 'material-ui/Card';
import { Tabs, Tab } from 'material-ui/Tabs';
import 'whatwg-fetch';
import GoogleMap from './GoogleMaps';
// import $ from 'jquery';

import AssetTable from './AssetTable';
import Loading from './Loading';
// import Auth from './Auth/Auth.js';
const styleLoading = {
  background: '#e9e9e9',
  display: 'inherit',
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  opacity: 0.5,
  zIndex: 100000,
};

const styleNoLoading =
  {
    background: '#e9e9e9',
    display: 'none',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    opacity: 0.5,
    zIndex: 100000,
  };

const styleLoadingIcon = {
  marginLeft: '47%', marginTop: '-15vh', zIndex: 100000, display: 'inherit',
};

const styleNoLoadingIcon = {
  display: 'none',
};
// { display: 'none' };


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
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
    console.log(`Bearer ${this.state.token}`);
    // $.ajax({
    //   url: '/api/assets',
    //   header: {
    //     Authorization: `Bearer ${this.state.token}`,
    //     contentType: 'application/json',
    //     AccessControlAllowHeaders: 'Content-Type',
    //   },
    //   success(result) {
    //     console.log(result);
    //     this.setState({ data: result.rows });
    //   },
    // });
    this.setState({
      loading: true,
    });
    fetch('/api/assets', {
      header: {
        Authorization: `Bearer ${this.state.token}`,
      },
    }).then((result) => {
      console.log('result');
      return result.json();
    }).catch((error) => {
      console.error(error);
      this.setState({
        data: error,
        loading: false,
      });
    }).then((data) => {
      this.setState({
        data: data.rows,
        loading: false,
      });
    });
    // fetch('https://app79553870.auth0.com/oauth/token', {
    //   method: 'POST',
    //   header: { contentType: 'application/json', AccessControlAllowOrigin: '*' },
    //   body: {
    //     grant_type: 'client_credentials',
    //     client_id: 'zpnwpy9WANpL0KPI2ERHYWrOWXbEx0pK',
    //     client_secret: '_xKtDH2P4ioe1dl0Hf0vbBf1nRE8utR740KZyyJEjSvh9L1zWGU5XO7WsU7vk5sV',
    //     audience: 'https://assetar-stg.herokuapp.com/',
    //   },
    // }).then((result) => {
    //   console.log(result);
    //   this.setState({ data: result.json() });
    // });
  }


  render() {
    let loading = null;
    if (this.state.loading) { loading = <Loading />; } else {
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
              <Tab label="Charts" />
            </Tabs>
          </CardText>
        </Card>
        {loading}

      </div>
    );
  }
}
