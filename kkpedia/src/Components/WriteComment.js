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

function WriteComment() {
	const db = firebase.firestore();
	const [score, setScore] = useState("0");

	const GiveScore = (e) => {
		setScore(e.target.value);
	};

	const SendComment = () => {
		console.log("SendComment");
	};

	return (
		<Container>
			<PlaceName>青瓦臺</PlaceName>
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
			<TextArea />
			<SendBtn onClick={SendComment} />
		</Container>
	);
}

export default WriteComment;
