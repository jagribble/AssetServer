import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';


export class MapContainer extends Component {
  constructor(props) {
    super(props);
      this.state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
      }


      this.onMarkerClick = this.onMarkerClick.bind(this);
      this.onMapClicked = this.onMapClicked.bind(this);
    }

    onMarkerClick = (props, marker, e) => {
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
      });
    };
    onMouseoverMarker =(props, marker, e)=> {
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
      });
    };

    onMapClicked = (props) => {
      if (this.state.showingInfoWindow) {
        this.setState({
          showingInfoWindow: true,
          activeMarker: null
        })
      }
    };
  render() {
  //  this.props.google.maps.setCenter(this.props.center);
    console.log(this.props);
    return (
      <Map
        google={this.props.google}
        fullscreenControl={false}
        mapTypeControl={false}
        containerStyle={{width: '55%', height: '250px', position: 'relative'}}
        zoom={14}
        initialCenter={this.props.center}

      >
        <Marker
          onClick={this.onMarkerClick}
          title="The marker`s title will appear as a tooltip."
          name="SOMA"
          position={{ lat: this.props.center.lat, lng: this.props.center.lng }}
        />

        { /* <Marker
          onClick={this.onMarkerClick}
          name="Current location"
        />
*/}
        <InfoWindow onClose={this.onInfoWindowClose}>
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
