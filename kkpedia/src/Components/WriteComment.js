import React, { useState } from "react";
import styled from "styled-components";
import firebase from "../utils/firebase";
import star from "../img/star.png";
import paper from "../img/rm429-013.png";
import Swal from "sweetalert2";

const Container = styled.div`
	width: 50vmin;
	height: 70vmin;
	background-image: url(${paper});
	background-repeat: no-repeat;
	background-size: 100% 100%;
	position: fixed;
	top: 50%;
	left: 50%;
	margin-left: -25vmin;
	margin-top: -35vh;
	padding: 3vmin;
	display: flex;
	flex-direction: column;
	/* justify-content: center; */
	z-index: 5;
	/* outline: 5px solid blue; */
`;

const Comment = styled.div`
	margin-top: 10vmin;
	display: flex;
	flex-direction: column;
	justify-content: center;
	/* outline: 5px solid black; */
`;

const Grade = styled.div`
	display: flex;
	justify-content: center;
	margin-bottom: 2vmin;
	@media screen and (max-width: 1200px) {
		flex-direction: column;
		align-items: center;
	}
`;

const ScoreInput = styled.input`
	width: 15vmin;
	margin-right: 2vmin;
	/* &::-webkit-slider-runnable-track {
		width: 100%;
		height: 1vmin;
		background: black;
	} */

	@media screen and (max-width: 1200px) {
		width: 20vmin;
		margin-right: 0vmin;
		margin-bottom: 2vmin;
	}
`;

const Score = styled.div`
	display: flex;
`;

const Star = styled.div`
	background-image: url(${star});
	background-repeat: no-repeat;
	background-size: 100%;
	width: 3vmin;
	height: 3vmin;
	@media screen and (max-width: 1200px) {
		width: 4vmin;
		height: 4vmin;
	}
`;

const ScoreNumber = styled.p`
	font-size: 3vmin;
	margin-left: 0.5vmin;
	@media screen and (max-width: 1200px) {
		font-size: 4vmin;
	}
`;

const PlaceName = styled.p`
	font-size: 3.5vmin;
	font-weight: 600;
	text-align: center;
	margin-bottom: 3vmin;
`;

const TextArea = styled.textarea`
	width: 90%;
	min-height: 20vmin;
	border-radius: 7px;
	padding: 1vmin;
	align-self: center;
	font-size: 3vmin;
`;

const SendBtn = styled.div`
	width: 90%;
	margin: 5vmin auto;
	background-color: transparent;
	background-image: linear-gradient(to bottom, #9c8879, #482307);
	border: 0 solid #e5e7eb;
	border-radius: 0.5rem;
	box-sizing: border-box;
	color: #f8eedb;
	column-gap: 1rem;
	cursor: pointer;
	display: flex;
	justify-content: center;
	font-size: 2vmin;
	font-weight: 700;
	line-height: 2vmin;
	outline: 2px solid transparent;
	padding: 1.3vmin 2.3vmin;
	text-transform: none;
	transition: all 0.1s cubic-bezier(0.4, 0, 0.2, 1);
	user-select: none;
	-webkit-user-select: none;
	touch-action: manipulation;
	box-shadow: 6px 8px 10px rgba(81, 41, 10, 0.1),
		0px 2px 2px rgba(81, 41, 10, 0.2);
	&:hover {
		background-color: #f3f4f6;
		box-shadow: 1px 2px 5px rgba(81, 41, 10, 0.15),
			0px 1px 1px rgba(81, 41, 10, 0.15);
		transform: translateY(0.125rem);
	}

	@media screen and (max-width: 550px) {
		padding: 2.5vmin 3.2vmin;
	}
`;

function WriteComment({ title, location, setPopUpWriteComment }) {
	const db = firebase.firestore();
	const user = firebase.auth().currentUser;
	const [userImg, setUserImg] = useState("");
	const [score, setScore] = useState("0");
	const [comment, setComment] = useState("");

	db.collection("users")
		.doc(`${user.uid}`)
		.get()
		.then((doc) => {
			if (doc.exists) {
				setUserImg(doc.data().userImage);
			} else {
				// doc.data() will be undefined in this case
				console.log("No such document!");
			}
		});

	const GiveScore = (e) => {
		setScore(e.target.value);
	};

	const SendComment = () => {
		if (comment === "") {
			Swal.fire("請輸入評論內容");
			return;
		}

		if (score === "0") {
			Swal.fire("至少給個一分唷~");
			return;
		}

		const data = {
			uid: user.uid,
			postUserImg: userImg,
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
				Swal.fire("留言成功👍👌");
				setPopUpWriteComment(false);
			});
	};

	return (
		<Container>
			<Comment>
				<PlaceName>{location}</PlaceName>
				<Grade>
					<ScoreInput
						type="range"
						min="0"
						max="5"
						step="1"
						name="score"
						value={score}
						onChange={GiveScore}
					/>
					<Score>
						<Star />
						<ScoreNumber>{score}</ScoreNumber>
					</Score>
				</Grade>
				<TextArea
					value={comment}
					onChange={(e) => {
						setComment(e.target.value);
					}}
				/>
				<SendBtn onClick={SendComment}>送出評論</SendBtn>
			</Comment>
		</Container>
	);
}

export default WriteComment;
