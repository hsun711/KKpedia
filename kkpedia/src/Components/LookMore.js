import React, { useState, useEffect } from "react";
import styled from "styled-components";
import firebase from "../utils/firebase";
import mainImage from "../img/wanted.png";
import star from "../img/star.png";

const Container = styled.div`
	width: 80vmin;
	background-color: beige;
	position: fixed;
	top: 50%;
	left: 50%;
	margin-left: -40vmin;
	margin-top: -40vh;
	padding: 5vmin 7vmin;
	display: flex;
	flex-direction: column;
	z-index: 5;
`;

const CommentArea = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	margin: 0px auto;
`;

const Comment = styled.div`
	padding: 2vmin;
	background-color: #dfe6e9;
	border-radius: 10px;
	display: flex;
	margin-bottom: 2vmin;
`;

const CommentUser = styled.img`
	width: 3vmin;
	height: 3vmin;
	border-radius: 50%;
	outline: 1px solid black;
`;
const CommentTxt = styled.div`
	padding: 0px 2vmin;
	display: flex;
	flex-direction: column;
`;

const NormalTxt = styled.p`
	font-size: 2vmin;
`;
const Score = styled.div`
	background-image: url(${star});
	background-repeat: no-repeat;
	background-size: 100%;
	width: 2vmin;
	height: 2vmin;
	margin-bottom: 1vmin;
`;

const ScoreTxt = styled.p`
	font-size: 2vmin;
	font-weight: 600;
	margin-left: 2.3vmin;
`;

const TimeStamp = styled.div`
	font-size: 1vmin;
	margin-top: 1vmin;
	margin-left: 40vmin;
`;

function LookMore({ title, location }) {
	const db = firebase.firestore();
	const docRef = db.collection("categories");
	const [comment, setComment] = useState([]);

	useEffect(() => {
		docRef
			.doc(`${title}`)
			.collection("reviews")
			.where("locationName", "==", `${location}`)
			.orderBy("timestamp", "desc")
			.onSnapshot((querySnapshot) => {
				const item = [];
				querySnapshot.forEach((doc) => {
					// console.log(doc.data());
					item.push(doc.data());
					// setComment([doc.data()]);
				});
				setComment(item);
			});
	}, []);

	return (
		<Container>
			<CommentArea>
				{comment.map((data) => {
					const time = data.timestamp;
					return (
						<Comment>
							<CommentUser src={data.postUserImg || mainImage} />
							<CommentTxt>
								<Score>
									<ScoreTxt>{data.score}</ScoreTxt>
								</Score>
								<NormalTxt>{data.comment}</NormalTxt>
								<TimeStamp>{new Date(time).toLocaleString()}</TimeStamp>
							</CommentTxt>
						</Comment>
					);
				})}
			</CommentArea>
		</Container>
	);
}

export default LookMore;
