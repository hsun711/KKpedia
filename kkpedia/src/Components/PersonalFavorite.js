import React, { useState, useEffect } from "react";
import styled from "styled-components";
import firebase from "../utils/firebase";
import MultiMap from "./MultiMap";
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

const EachPlace = styled.div`
	display: flex;
	margin: 5vmin 3vmin 2vmin 0vmin;
	padding: 2vmin 3vmin;
`;

const PlaceImg = styled.img`
	width: 8vmin;
	height: 8vmin;
`;

const PlaceTxt = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin-left: 1vmin;
`;

const TitleTxt = styled.p`
	font-size: 2vmin;
	font-weight: 600;
`;

const NormalTxt = styled.p`
	font-size: 1vmin;
	margin-top: 1.5vmin;
`;

function PersonalFavorite() {
	const user = firebase.auth().currentUser;
	const db = firebase.firestore();
	const userId = user.uid;
	const docRef = db.collection("users").doc(`${userId}`);
	const [collectPlace, setCollectPlace] = useState([]);

	useEffect(() => {
		docRef
			.collection("likes")
			.get()
			.then((snapshot) => {
				const item = [];
				snapshot.forEach((doc) => {
					item.push(doc.data());
				});
				setCollectPlace(item);
			})
			.catch((err) => {
				console.log("Error getting sub-collection documents", err);
			});
	}, []);

	return (
		<ProfileContainer>
			<MapArea>
				<MultiMap />
			</MapArea>
			<CollectionArea>
				{collectPlace.map((item) => {
					const data = item.placeData[0];
					return (
						<EachPlace key={data.locationName}>
							<PlaceImg src={img} />
							<PlaceTxt>
								<TitleTxt>{data.locationName}</TitleTxt>
								<NormalTxt>{data.description}</NormalTxt>
							</PlaceTxt>
						</EachPlace>
					);
				})}
			</CollectionArea>
		</ProfileContainer>
	);
}

export default PersonalFavorite;
