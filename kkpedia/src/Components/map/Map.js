import React from "react";
import GoogleMapReact from "google-map-react";
import { Key } from "../../key";
import styled from "styled-components";
import pin from "../../img/pin-map.png";

const AnyReactComponent = ({ text }) => <Pin />;

const Container = styled.div`
  width: 100%;
  height: 20vmin;
`;

const Pin = styled.div`
  background-image: url(${pin});
  background-repeat: no-repeat;
  background-size: 100%;
  width: 3vmin;
  height: 3vmin;
`;

const Map = ({ latitude, placeId }) => {
  const defaultProps = {
    center: {
      lat: 25.04,
      lng: 121.5,
    },
    zoom: 15,
  };
  return (
    <Container>
      <GoogleMapReact
        bootstrapURLKeys={{ key: Key }}
        defaultCenter={latitude}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
      >
        <AnyReactComponent
          key={placeId}
          lat={latitude.lat}
          lng={latitude.lng}
          placeId={placeId}
          text=""
        />
      </GoogleMapReact>
    </Container>
  );
};

export default Map;
