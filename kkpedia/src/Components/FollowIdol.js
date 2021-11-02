import React, { useState } from "react";
import styled from "styled-components";
import firebase from "../utils/firebase";
import cover from "../img/wanted.png";
import unlike from "../img/unlike.png";
import like from "../img/like.png";

const EachFollow = styled.div`
	margin-right: 1vmin;
	padding: 1vmin;
	display: flex;
	flex-direction: column;
	align-items: center;
	/* outline: 1px solid black; */
`;

const EachStar = styled.div`
	display: flex;
	align-items: center;
`;
const PerStar = styled.img`
	width: 7vmin;
	height: 7vmin;
`;

const LikeIcon = styled.img`
	width: 2vmin;
	height: 2vmin;
	margin-left: 1vmin;
	cursor: pointer;
`;

const NormalTxt = styled.p`
	font-size: 2vmin;
`;

function FellowIdol({ title, image }) {
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
			<PerStar src={image || cover} />
			<EachStar>
				<NormalTxt>{title}</NormalTxt>
				<LikeIcon src={like} onClick={ToggleFollow} />
			</EachStar>
		</EachFollow>
	);
}

export default FellowIdol;
