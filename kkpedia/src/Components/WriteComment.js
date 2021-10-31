import React, { useState } from "react";
import styled from "styled-components";
import firebase from "../utils/firebase";
import send from "../img/submit.png";
import star from "../img/star.png";

const Container = styled.div`
	width: 70vmin;
	background-color: beige;
	position: fixed;
	top: 50%;
	left: 50%;
	margin-left: -35vmin;
	margin-top: -40vh;
	padding: 5vmin 7vmin;
	display: flex;
	flex-direction: column;
	z-index: 5;
`;

const Grade = styled.div`
	display: flex;
	justify-content: center;
	margin-bottom: 2vmin;
`;

const Score = styled.input`
	margin-right: 2vmin;
	/* &::-webkit-slider-runnable-track {
		width: 100%;
		height: 1vmin;
		background: black;
	} */
`;

const Star = styled.div`
	background-image: url(${star});
	background-repeat: no-repeat;
	background-size: 100%;
	width: 3vmin;
	height: 3vmin;
`;

const ScoreNumber = styled.p`
	font-size: 3vmin;
	margin-left: 0.5vmin;
`;

const PlaceName = styled.p`
	font-size: 3.5vmin;
	font-weight: 600;
	text-align: center;
	margin-bottom: 2vmin;
`;

const TextArea = styled.textarea`
	width: 90%;
	height: 10vmin;
	margin-left: 4vmin;
	border-radius: 7px;
	padding: 1vmin;
	align-self: center;
`;

const SendBtn = styled.div`
	background-image: url(${send});
	background-size: 100%;
	background-repeat: no-repeat;
	width: 10vmin;
	height: 10vmin;
	margin-left: 43vmin;
	cursor: pointer;
	&:hover {
		background-position-x: 1px;
		background-position-y: 1px;
	}
`;

function WriteComment({ title, location, setPopUpWriteComment }) {
	const db = firebase.firestore();
	const user = firebase.auth().currentUser;
	const [score, setScore] = useState("0");
	const [comment, setComment] = useState("");

	const GiveScore = (e) => {
		setScore(e.target.value);
	};

	const SendComment = () => {
		// console.log("SendComment");
		// console.log(title);
		// console.log(location);
		const data = {
			uid: user.uid,
			postUserImg: user.photoURL,
			comment: comment,
			locationName: location,
			score: score,
			timestamp: new Date().getTime(),
		};
		db.collection("categories")
			.doc(`${title}`)
			.collection("reviews")
			.doc()
			.set(data, { merge: true })
			.then(() => {
				alert("留言成功👍👌");
				setPopUpWriteComment(false);
			});
	};

	return (
		<Container>
			<PlaceName>{location}</PlaceName>
			<Grade>
				<Score
					type="range"
					min="0"
					max="5"
					step="1"
					name="score"
					value={score}
					onChange={GiveScore}
				/>
				<Star />
				<ScoreNumber>{score}</ScoreNumber>
			</Grade>
			<TextArea
				value={comment}
				onChange={(e) => {
					setComment(e.target.value);
				}}
			/>
			<SendBtn onClick={SendComment} />
		</Container>
	);
}

export default WriteComment;
