import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import GoogleMapReact from "google-map-react";
import { Key } from "../../key";
import styled from "styled-components";
import pin from "../../img/pin-map.png";
import { snapshotUserCollectPlace } from "../../utils/firebaseFunc";

const MyPositionMarker = ({ text }) => (
  <PlaceDetail>
    <Pin />
    <PlaceText>{text}</PlaceText>
  </PlaceDetail>
);
const Container = styled.div`
  width: 100%;
  height: 60vmin;
`;

const PlaceText = styled.div`
  display: none;
  font-size: 1.75vmin;
  font-weight: 600;
  background-color: rgba(224, 217, 207, 0.8);
  padding: 0.5vmin;
  border-radius: 8px;
  margin-left: 0.5vmin;
  z-index: 5;
`;

const PlaceDetail = styled.div`
  display: flex;
  min-width: 20vmin;
  &:hover ${PlaceText} {
    display: block;
  }
`;

const Pin = styled.div`
  background-image: url(${pin});
  background-repeat: no-repeat;
  background-size: 100%;
  width: 2vmin;
  height: 2vmin;
  &:hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`;

const MultiMap = () => {
  const defaultProps = {
    center: {
      lat: 32.19,
      lng: 126.85,
    },
    zoom: 2,
  };

  const [collectPlace, setCollectPlace] = useState([]);
  const currentUser = useSelector((state) => state.currentUser);

  useEffect(() => {
    if (currentUser && currentUser.uid) {
      const unsubscribe = snapshotUserCollectPlace(
        currentUser.uid,
        setCollectPlace
      );
      return () => {
        unsubscribe();
      };
    }
  }, [currentUser]);
  return (
    <Container>
      <GoogleMapReact
        bootstrapURLKeys={{ key: Key }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
      >
        {collectPlace.map((item) => {
          return (
            <MyPositionMarker
              key={item.placeId}
              lat={item.latitude.lat}
              lng={item.latitude.lng}
              text={item.locationName}
            />
          );
        })}
      </GoogleMapReact>
    </Container>
  );
};

export default MultiMap;
