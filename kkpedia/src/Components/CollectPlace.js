import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import firebase from "../utils/firebase";
import Swal from "sweetalert2";
import img from "../img/wanted.png";
import like from "../img/like.png";

const EachPlace = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: rgba(256, 256, 256, 0.7);
	border-radius: 10px;
	box-shadow: 10px 10px 30px 5px rgba(0, 0, 0, 0.2);
	width: 25vmin;
	height: 30vmin;
	display: flex;
	margin: 2vmin;
	padding-bottom: 1vmin;
	@media screen and (max-width: 1200px) {
		width: 30vmin;
		height: 35vmin;
	}
`;

const PlaceImg = styled.a`
	width: 100%;
	height: 50%;
	overflow: hidden;
	border-radius: 10px 10px 0 0;
`;

const Image = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`;

const PlaceTxt = styled.div`
	height: 50%;
	width: 90%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	@media screen and (max-width: 1200px) {
		margin-top: 1vmin;
	}
`;

const TitleTxt = styled.p`
	font-size: 3vmin;
	font-weight: 600;
	display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
	@media screen and (max-width: 1200px) {
		font-size: 3.5vmin;
	}
`;

const PlaceDescription = styled.div`
	width: fit-content;
	word-wrap: break-word;
	text-align: center;
`;

const NormalTxt = styled.p`
	font-size: 2vmin;
	margin: 1vmin 0;
	@media screen and (max-width: 500px) {
		font-size: 2.5vmin;
	}
`;

const SmallTxt = styled.p`
	font-size: 1.5vmin;
	color: #34495e;
	display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
	@media screen and (max-width: 1200px) {
		font-size: 2vmin;
	}
`;

const LikeIcon = styled.img`
	width: 3vmin;
	height: 3vmin;
	cursor: pointer;
	@media screen and (max-width: 1200px) {
		align-self: flex-end;
		margin-right: 1.5vmin;
	}
`;

function CollectPlace({ data }) {
	const db = firebase.firestore();
	const currentUser = useSelector((state) => state.currentUser);
	const docRef = db.collection("categories");

	const RemoveMyLikes = () => {
		db.collection("users")
			.doc(`${currentUser.uid}`)
			.collection("likes")
			.doc(`${data.locationName}`)
			.delete()
			.then(() => {
				Swal.fire("取消收藏");
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
				collectedBy: firebase.firestore.FieldValue.arrayRemove(
					`${currentUser.uid}`
				),
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
			<PlaceImg
				href={`/${data.topic}/${data.title}/${data.locationName}`}
				target="_blank"
			>
				<Image src={data.images.length === 0 ? img : data.images[0]} />
			</PlaceImg>
			<PlaceTxt>
				<TitleTxt>{data.locationName}</TitleTxt>
				<NormalTxt>{data.title}</NormalTxt>
				<PlaceDescription>
					<SmallTxt>{data.description}</SmallTxt>
				</PlaceDescription>
			</PlaceTxt>
			<LikeIcon src={like} onClick={ToggleCollect} />
		</EachPlace>
	);
}

export default CollectPlace;
