import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import MultiMap from "../map/MultiMap";
import CollectPlace from "./CollectPlace";
import { snapshotUserCollectPlace } from "../../utils/firebaseFunc";

const ProfileContainer = styled.div`
  width: 100%;
  padding: 4vmin;
`;

const MapArea = styled.div`
  width: 100%;
  height: 60vmin;
`;

const CollectionArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 3vmin 0;
  @media screen and (max-width: 1024px) {
    justify-content: center;
  }
`;

function PersonalCollection({ setActiveItem }) {
  const currentUser = useSelector((state) => state.currentUser);
  const [collectPlace, setCollectPlace] = useState([]);

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
    setActiveItem("/profile/myCollection");
  }, [currentUser]);

  return (
    <ProfileContainer>
      <MapArea>
        <MultiMap />
      </MapArea>
      <CollectionArea>
        {collectPlace.map((data) => {
          return <CollectPlace data={data} key={data.locationName} />;
        })}
      </CollectionArea>
    </ProfileContainer>
  );
}

export default PersonalCollection;
