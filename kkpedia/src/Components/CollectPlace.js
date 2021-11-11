import React, { useState, useEffect } from "react";
import styled from "styled-components";
import firebase from "../utils/firebase";
import img from "../img/wanted.png";
import like from "../img/like.png";

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
const Title = styled.div`
	display: flex;
	align-items: center;
`;
const TitleTxt = styled.p`
	font-size: 2vmin;
	font-weight: 600;
`;

const NormalTxt = styled.p`
	font-size: 1vmin;
	margin-top: 1vmin;
`;
const LikeIcon = styled.img`
	width: 2vmin;
	height: 2vmin;
	margin-left: 1vmin;
	cursor: pointer;
`;

function CollectPlace({ data }) {
	const db = firebase.firestore();
	const docRef = db.collection("categories");
	const user = firebase.auth().currentUser;

	const RemoveMyLikes = () => {
		db.collection("users")
			.doc(`${user.uid}`)
			.collection("likes")
			.doc(`${data.locationName}`)
			.delete()
			.then(() => {
				alert("取消收藏😤😤");
			})
			.catch((error) => {
				console.error("Error removing document: ", error);
			});
	};

	const RemoveCollectedBy = () => {
		docRef
			.doc(`${data.title}`)
			.collection("places")
			.doc(`${data.locationName}`)
			.update({
				collectedBy: firebase.firestore.FieldValue.arrayRemove(`${user.uid}`),
			})
			.then(() => {
				// console.log(user.uid);
			});
	};

	const ToggleCollect = () => {
		RemoveMyLikes();
		RemoveCollectedBy();
	};

	return (
		<EachPlace>
			<PlaceImg src={data.images.length === 0 ? img : data.images[0]} />
			<PlaceTxt>
				<Title>
					<TitleTxt>{data.locationName}</TitleTxt>
					<LikeIcon src={like} onClick={ToggleCollect} />
				</Title>
				<NormalTxt>{data.title}</NormalTxt>
				<NormalTxt>{data.description}</NormalTxt>
			</PlaceTxt>
		</EachPlace>
	);
}

export default CollectPlace;
