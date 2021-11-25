import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import firebase from "../../utils/firebase";
import { Key } from "../../key";
import styled from "styled-components";
import pin from "../../img/pin-map.png";

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
	const handleApiLoaded = (map, maps) => {
		// use map and maps objects
		// console.log("載入完成!"); // 印出「載入完成」
	};

	const [collectPlace, setCollectPlace] = useState([]);
	const user = firebase.auth().currentUser;
	const db = firebase.firestore();
	const userId = user.uid;
	const docRef = db.collection("users").doc(`${userId}`);

	useEffect(() => {
		const unsubscribe = docRef.collection("likes").onSnapshot((snapshot) => {
			const item = [];
			snapshot.forEach((doc) => {
				item.push(doc.data());
			});
			setCollectPlace(item);
		});
		return () => unsubscribe();
	}, []);
	return (
		// Important! Always set the container height explicitly
		<Container>
			<GoogleMapReact
				bootstrapURLKeys={{ key: Key }}
				defaultCenter={props.center}
				defaultZoom={props.zoom}
				yesIWantToUseGoogleMapApiInternals // 設定為 true
				onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)} // 載入完成後執行
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
