import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import firebase from "../utils/firebase";
import { Key } from "../key";
import styled from "styled-components";
import pin from "../img/pin-map.png";

const MyPositionMarker = ({ text }) => <Pin />;

const Container = styled.div`
	width: 100%;
	height: 50vmin;
`;

const Pin = styled.div`
	background-image: url(${pin});
	background-repeat: no-repeat;
	background-size: 100%;
	width: 2vmin;
	height: 2vmin;
`;

// Map
const SimpleMap = (props) => {
	const handleApiLoaded = (map, maps) => {
		// use map and maps objects
		console.log("載入完成!"); // 印出「載入完成」
	};

	const [collectPlace, setCollectPlace] = useState([]);

	const user = firebase.auth().currentUser;
	const db = firebase.firestore();
	const userId = user.uid;
	const docRef = db.collection("users").doc(`${userId}`);

	useEffect(() => {
		docRef
			.collection("likes")
			.get()
			.then((snapshot) => {
				const item = [];
				snapshot.forEach((doc) => {
					item.push(doc.data().placeData[0]);
				});
				setCollectPlace(item);
			})
			.catch((err) => {
				console.log("Error getting sub-collection documents", err);
			});
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
							text=""
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
		lat: 25.04,
		lng: 121.5,
	},
	zoom: 5,
};

// App
function MultiMap() {
	return <SimpleMap />;
}

export default MultiMap;
