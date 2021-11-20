import React, { useState, useEffect } from "react";
import styled from "styled-components";
import firebase from "../utils/firebase";
import MultiMap from "./MultiMap";
import CollectPlace from "./CollectPlace";
import img from "../img/wanted.png";
import board from "../img/cork-board.png";

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
	/* outline: 3px solid red; */
	@media screen and (max-width: 1024px) {
		justify-content: center;
	}
`;

function PersonalCollection({ setActiveItem }) {
	const user = firebase.auth().currentUser;
	const db = firebase.firestore();
	const userId = user.uid;
	const docRef = db.collection("users").doc(`${userId}`);
	const [collectPlace, setCollectPlace] = useState([]);

	useEffect(() => {
		const unsubscribe = docRef
			.collection("likes")
			.onSnapshot((querySnapshot) => {
				const item = [];
				querySnapshot.forEach((doc) => {
					item.push(doc.data());
				});
				setCollectPlace(item);
			});
		setActiveItem("/profile/myCollection");
		return () => unsubscribe();
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
