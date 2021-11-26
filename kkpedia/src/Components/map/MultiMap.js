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

const PlaceDetail = styled.div`
	display: flex;
	min-width: 30vmin;
	align-items: center;
`;

const Pin = styled.div`
	background-image: url(${pin});
	background-repeat: no-repeat;
	background-size: 100%;
	width: 2vmin;
	height: 2vmin;
`;

const PlaceText = styled.div`
	font-size: 1.75vmin;
	font-weight: 600;
	background-color: rgba(224, 217, 207, 0.8);
	padding: 0.5vmin;
	border-radius: 8px;
	margin-left: 0.5vmin;
	&:hover {
		background-color: white;
		transform: scale(1.1);
		z-index: 2;
	}
`;

// Map
const SimpleMap = (props) => {
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
		// Important! Always set the container height explicitly
		<Container>
			<GoogleMapReact
				bootstrapURLKeys={{ key: Key }}
				defaultCenter={props.center}
				defaultZoom={props.zoom}
				yesIWantToUseGoogleMapApiInternals // 設定為 true
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

// 由於改寫成 functional component，故另外設定 defaultProps
SimpleMap.defaultProps = {
	center: {
		lat: 32.19,
		lng: 126.85,
	},
	zoom: 4,
};

// App
function MultiMap() {
	return <SimpleMap />;
}

export default MultiMap;
