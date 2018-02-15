import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';


export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    };


    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
    this.getMarkers = this.getMarkers.bind(this);
  }

  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  }
  onMouseoverMarker(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  }

  onMapClicked(props) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: true,
        activeMarker: null,
      });
    }
  }

  getMarkers() {
    return this.props.assets.map((asset) => {
      return (
        <Marker
          key={asset.assetname}
          onClick={this.onMarkerClick}
          title={asset.assetname}
          name={asset.assetname}
          position={{ lat: asset.assetx, lng: asset.assety }}
        />);
    });
  }
  render() {
    return (
      <Map
        google={this.props.google}
        fullscreenControl={false}
        mapTypeControl={false}
        containerStyle={{ width: '100%', height: '250px', position: 'relative' }}
        zoom={14}
        centerAroundCurrentLocation={!this.props.center}
        initialCenter={this.props.center ? this.props.center : { lat: 0, lng: 0 }}

      >
        {this.getMarkers()}

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onInfoWindowClose}
        >
          <div>
            <h1>{this.state.selectedPlace.name}</h1>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: `${process.env.GOOGLE_API_KEY}`,
  version: '3.30',
})(MapContainer);
