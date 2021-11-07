import React, { useState, useEffect } from "react";
import styled from "styled-components";
import firebase from "../utils/firebase";
import MultiMap from "./MultiMap";
import CollectPlace from "./CollectPlace";
import img from "../img/wanted.png";

const ProfileContainer = styled.div`
	background-color: #c7ecee;
	margin-top: 5vmin;
	padding: 4vmin;
`;

const MapArea = styled.div`
	width: 100%;
	height: 50vmin;
	margin: 1vmin 0px;
`;

const CollectionArea = styled.div`
	display: flex;
	flex-wrap: wrap;
`;

function PersonalCollection() {
	const user = firebase.auth().currentUser;
	const db = firebase.firestore();
	const userId = user.uid;
	const docRef = db.collection("users").doc(`${userId}`);
	const [collectPlace, setCollectPlace] = useState([]);

	useEffect(() => {
		docRef.collection("likes").onSnapshot((querySnapshot) => {
			const item = [];
			querySnapshot.forEach((doc) => {
				item.push(doc.data());
			});
			setCollectPlace(item);
		});
	}, []);

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
