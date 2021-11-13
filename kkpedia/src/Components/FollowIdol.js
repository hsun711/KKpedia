import React, { useState } from "react";
import styled from "styled-components";
import firebase from "../utils/firebase";
import cover from "../img/wanted.png";
import like from "../img/like.png";

const EachFollow = styled.div`
	background-color: rgba(256, 256, 256, 0.7);
	border-radius: 10px;
	box-shadow: 10px 10px 30px 5px rgba(0, 0, 0, 0.2);
	width: 23vmin;
	height: 22vmin;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	@media screen and (max-width: 1200px) {
		width: 30vmin;
		height: 30vmin;
		margin: 2vmin;
	}
`;

const FollowLink = styled.a`
	text-decoration: none;
	width: 100%;
	height: 65%;
	display: flex;
	justify-content: center;
	overflow: hidden;
	border-radius: 10px 10px 0 0;
`;

const PerStar = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`;

const EachStar = styled.div`
	display: flex;
	width: 90%;
	height: 35%;
	flex-direction: column;
	align-items: center;
	margin-top: 1vmin;
	@media screen and (max-width: 1200px) {
		margin-top: 1.7vmin;
	}
`;

const LikeIcon = styled.img`
	width: 3vmin;
	height: 3vmin;
	cursor: pointer;
	margin-top: 0.75vmin;
	@media screen and (max-width: 1200px) {
		width: 4vmin;
		height: 4vmin;
	}
`;

const NormalTxt = styled.p`
	font-size: 2.2vmin;
	font-weight: 600;
	@media screen and (max-width: 1200px) {
		font-size: 3vmin;
	}
`;

function FellowIdol({ title, image, topic }) {
	const db = firebase.firestore();
	const docRef = db.collection("categories");
	const user = firebase.auth().currentUser;

	const RemoveMyFollow = () => {
		db.collection("users")
			.doc(`${user.uid}`)
			.collection("follows")
			.doc(`${title}`)
			.delete()
			.then(() => {
				alert("取消追蹤😤😤");
			})
			.catch((error) => {
				console.error("Error removing document: ", error);
			});
	};
	const RemoveFollowedBy = () => {
		docRef
			.doc(`${title}`)
			.update({
				followedBy: firebase.firestore.FieldValue.arrayRemove(`${user.uid}`),
			})
			.then(() => {
				// console.log(user.uid);
			});
	};
	const ToggleFollow = () => {
		RemoveMyFollow();
		RemoveFollowedBy();
	};
	return (
		<EachFollow>
			<FollowLink href={`/${topic}/${title}`} target="_blank">
				<PerStar src={image || cover} />
			</FollowLink>
			<EachStar>
				<NormalTxt>{title}</NormalTxt>
				<LikeIcon src={like} onClick={ToggleFollow} />
			</EachStar>
		</EachFollow>
	);
}

export default FellowIdol;
