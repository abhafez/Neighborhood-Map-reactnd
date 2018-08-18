import React, { Component } from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react'

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };
  
  render() {
    {/*This style is used for the <Map></Map> inside only*/}
    const style = {
      width: '100%',
      height: '100%'
    }
    
    return (
      <Map
        google={this.props.google}
        initialCenter={{
          lat: 31.22,
          lng: 29.95
        }}
        style={style}
        onClick={this.onMapClicked}
      >
        {this.props.workspaces.map((location) => (
          <Marker
            onClick={this.onMarkerClick}
            animation={(this.props.selectedWorkspace[0]['id'] === location.id)
              && this.props.google.maps.Animation.BOUNCE}
            title={'The marker`s title will appear as a tooltip.'}
            name={location.name}
            phone={location.phone}
            address={location.address}
            link={location.page}
            photo={location.image}
            icon={{
              url: "./images/location64.png"
            }}
            position={{ lat: location.lat, lng: location.lng }}  />
        ))}
        {/* for UX the same icon included 64 & 32 */}
        {/* NOTE: the last comment crashes code when included inside the Marker tag*/}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
          <div className="infoWindow">
            <h3 className ="info-title">{this.state.selectedPlace.name}</h3>
            <p className= "info-address"><i class="material-icons">location_on</i>{this.state.selectedPlace.address}</p>
            <p className="info-phone"><i class="material-icons">phone</i>{this.state.selectedPlace.phone}</p>
            <img className="info-img" src={this.state.selectedPlace.photo} alt=""/>
            <div className="info-link"><a className="info-link" href={this.state.selectedPlace.link}>Visit page</a></div>
          </div>
        </InfoWindow>
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyAHU00QUEXigecU9sB3QrG1hl7kfT97lXg')
})(MapContainer)
