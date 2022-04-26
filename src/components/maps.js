import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      mapLocation: {
        lat: 20.905886,
        lng: 70.387505,
      },
    };
  }

  handleChange = (address) => {
    this.setState({ address });
    console.log(this.state.address);
  };

  handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        console.log("Success", latLng);
        this.setState({ address });
        this.setState({ mapLocation: latLng });
      })
      .catch((error) => console.error("Error", error));
  };

  render() {
    return (
      <div id="maps">
        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: "Search Places ...",
                  className: "location-search-input",
                })}
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion) => {
                  const className = suggestion.active
                    ? "suggestion-item--active"
                    : "suggestion-item";
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: "#fafafa", cursor: "pointer" }
                    : { backgroundColor: "#ffffff", cursor: "pointer" };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
        <Map
          google={this.props.google}
          initialCenter={{
            lat: this.state.mapLocation.lat,
            lng: this.state.mapLocation.lng,
          }}
          center={{
            lat: this.state.mapLocation.lat,
            lng: this.state.mapLocation.lng,
          }}
        >
          <Marker
            position={{
              lat: this.state.mapLocation.lat,
              lng: this.state.mapLocation.lng,
            }}
          />
        </Map>
      </div>
    );
  }
}

MapContainer = GoogleApiWrapper({
  apiKey: "AIzaSyCbSy_jiBSp4i1zNY878aTME6LOPm1-lK0",
})(MapContainer);
